async function main() {
  const fs = require('fs');
  const low = require('lowdb');
  const FileSync = require('lowdb/adapters/FileAsync');
  const server = require('./server');
  const adapter = new FileSync('db.json');
  const db = await low(adapter);
  db.defaults({ servers: [] }).write();
  global.db = db;
  const {prefix } = require('./config.json');
  const {token} = require('./token.json');
  const {log, logError} = require('./commands/log.js');
  var path = require('path');
  global.appRoot = path.resolve(__dirname);
  console.log(global.appRoot);
  global.commands = {};
  const ms = require('ms');
  const Discord = require('discord.js');
  global.client = new Discord.Client();
  global.client.commands = new Discord.Collection();
  var commandFiles = [];
  const isFile = fileName => {
    return !fs.lstatSync(fileName).isFile()
  }
  var commandFolders = fs.readdirSync('./commands').map(fileName => {
    return('./commands/'+fileName);
  }).filter(isFile);
  for(var i of commandFolders){
    var files = fs.readdirSync(i).filter(file => file.endsWith('.js'));
    for(var file of files){
      commandFiles.push(i + '/'+ file);
    }
  }
  var {messages} = require('./messages.json');
  var mutes = require('./mutes.json');
  for (const file of commandFiles) {
    const command = require(`${file}`);
    console.log("Found command: "+command.name);
    if(command.isCommand){
      global.client.commands.set(command.name, command);
      global.commands[command.name] = command;
    }
  }
  console.log("commanded");
  global.client.on('message', message => {
    console.log(message.content);
    global.lag = global.client.ping;
    global.uptime = global.client.uptime;
    console.log(global.client.uptime);
    if (!message.content.startsWith(global.db.get('servers').find({id: message.guild.id}).value().prefix) || message.author.bot) return;

    const args = message.content.slice(1).split(/ +/);

    console.log("Args: "+args);
    console.log(args);
    if(args[0] == ''){
      args.shift();
    }
    console.log(args.length);
    const commandName = args.shift().toLowerCase();
    const command = global.client.commands.get(commandName)
      || global.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;
      log(`${message.author} did not provide any args for ${command.name}`)
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.useage}\``;
      }

      return message.channel.send(reply);
    }
    if(command.perms){
      if(!message.member.hasPermission(command.perms)){
        return message.reply(`insufficient permissions! You need to have \`${command.perms}\` in order to run this!`);
      }
    }
    console.log("Matched command!" + command.name);
    if (command.guildOnly && message.channel.type !== 'text') {
      return message.reply('I can\'t execute that command inside DMs!');
    }
    if(command.premium && !global.db.get('servers').find({id: message.guild.id}).value().premium){
      return message.reply(`That\'s a premium command. Get premium for this server at https://oxygen.io/premium/`)
    }
    try {
      console.log("Args here:" + args);
      command.execute(message, args);
    } catch (error) {
      logError(error, 'index.js');
      console.log(error);
      message.reply('there was an error trying to execute that command!');
    }

  });//here
  console.log('Logging in with token: ' + token);
  global.client.login(token);

  global.client.on('ready', () => {
    console.log("I'm in - Basic Bot has arrived.");
    console.log(global.client.user.username);
    log(`Bot has started, with ${global.client.users.size} users, in ${global.client.channels.size} channels of ${global.client.guilds.size} guilds.`, 'index.js');
    global.client.user.setStatus('available');
    global.client.user.setActivity("life","at sentinence");
  });
  global.client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`, 'index.js');
    guild.roles.create({data: {name: "Member", permissions: guild.roles.everyone.ALL}});
    global.db.get('servers').push({id: guild.id, prefix: '>', premium: false}).write();
  });

  global.client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    log(`I have been removed from: ${guild.name} (id: ${guild.id})`, 'index.js');
  });
}
main();

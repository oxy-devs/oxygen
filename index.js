async function main() {
  global.good = ['692312512900890644', '311551089856217089', '689879989470101577', '698543119356002384'];
  const fs = require('fs');
  const server = require('./server');
  const {prefix } = require('./config.json');
  const {token} = require('./token.json');
  const Sequelize = require('sequelize');
  global.afk = {};
  const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
  });
  global.Servers = sequelize.define('servers', {
    internalID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      type: Sequelize.STRING,
      unique: true,
    },
    prefix: Sequelize.STRING,
    premium: Sequelize.BOOLEAN,
  });
  global.Tags = sequelize.define('tags', {
    internalID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    guild: Sequelize.STRING,
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    content: { type: Sequelize.TEXT },
    creator: Sequelize.STRING,
    usage_count: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });
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
  global.client.on('message', async message => {
    if(message.author.bot) return;
    console.log(message.guild.name, message.guild.id, message.content);
    message.mentions.users.forEach(user => {
      if(global.afk.hasOwnProperty(user.id)){
        var time = ((new Date().getTime()) - global.afk[user.id].timestamp);
				time -= (time%1000);
				var doneTime = ms(time);
        message.reply(`${user.tag} is afk, and has been for ${doneTime}.`);
        global.afk[user.id].pings++;
      }
    })
    //console.log(global.db.get('servers').find({id: message.guild.id}).value().prefix);
    global.lag = global.client.ping;
    global.uptime = global.client.uptime;
    var server = await global.Servers.findOne({ where: { id: message.guild.id } });
    if(!server){
      message.reply('You\'re not in my db, so I\'m adding this server with prefix >');
      try{
          server = await global.Servers.create({
          id: message.guild.id,
          prefix: '>',
          premium: false,
        });
      }catch(e){
        console.log(e);
        return message.reply('something went wrong adding this server.');
      }
    }
    if(!message.content.startsWith(server.get('prefix'))) return;
    const args = message.content.slice(server.get('prefix').length).split(/ +/);

    console.log("Args: "+args);
    if(args[0] == ''){
      args.shift();
    }
    console.log(args.length);
    const commandName = args.shift().toLowerCase();
    const command = global.client.commands.get(commandName)
      || global.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if (command.guildOnly && message.channel.type !== 'text') {
      return message.reply('I can\'t execute that command inside DMs!');
    }
    if(command.premium && !server.get('premium')){
      return message.reply(`That\'s a premium command. Get premium for this server at https://oxygen.io/premium/`)
    }
    if(command.perms){
      if(!message.member.hasPermission(command.perms)){
        return message.reply(`insufficient permissions! You need to have \`${command.perms}\` in order to run this!`);
      }
    }
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;
      log(`${message.author} did not provide any args for ${command.name}`)
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.useage}\``;
      }

      return message.channel.send(reply);
    }
    
    console.log("Matched command!" + command.name);
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
    global.Servers.sync();
    global.Tags.sync();
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
    //global.db.get('servers').push({id: guild.id, prefix: 'beta>', premium: false}).write();
  });

  global.client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    log(`I have been removed from: ${guild.name} (id: ${guild.id})`, 'index.js');
  });
}
main();

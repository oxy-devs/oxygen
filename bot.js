const fs = require('fs');
const {prefix } = require('./config.json');
const {token} = require('./token.json');
const {log, logError} = require('./commands/log.js');
var path = require('path');
global.appRoot = path.resolve(__dirname);
console.log(global.appRoot);
global.commands = {};
const ms = require('ms');
//const keep_alive = require('./keep_alive.js')
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
//console.log(commandFiles);
//const token = 'NjkyMzUwODE1Njc5MTUyMTc5.Xo95zQ.wmhujKZF5Y03vKAmdj-ggjFIm0A';
var {messages} = require('./messages.json');
var mutes = require('./mutes.json');
for (const file of commandFiles) {
	const command = require(`${file}`);
  console.log("Found command: "+command.name);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
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
  //console.log("MESSAGE");
  //log(JSON.stringify(message),'index.js')
  /*
  if(message.channel.type == 'text'){
    if(messages[message.server.id] != undefined){
      if(message[message.server.id][message.author.id] != undefined){
        message[message.server.id][message.author.id].push(message);
        var indexes = getAllIndexes(message[message.server.id][message.author.id], message.content.toLowerCase())
        if(indexes.length > 6 && (message.timestamp - message[message.server.id][message.author.id][indexes.length - 6].timestamp) < 60000){
          message.channel.send(`${message.author}, I think you're spamming. You have been muted for ${mute_time.toString()} minutes, for the greater good.`);
          mute()

        }
      }
    }
  }*//*
  if (message.content.includes("(╯°□°）╯︵ ┻━┻") && !message.author.bot){
    message.reply('┬─┬ ノ( ゜-゜ノ)');
    log(`Unflipped ${message.author}'s flip in ${message.guild}'s ${message.channel}. Message ID: ${message.id}`,'index.js');
  }*/
  if (!message.content.startsWith(prefix) || message.author.bot) return;

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

  try {
    console.log("Args here:" + args);
    command.execute(message, args);
  } catch (error) {
    logError(error, 'index.js');
    console.log(error);
    message.reply('there was an error trying to execute that command!');
  }

});//here
global.client.login(token);

global.client.on('ready', () => {
  console.log("I'm in - Basic Bot has arrived.");
  console.log(global.client.user.username);
  log(`Bot has started, with ${global.client.users.size} users, in ${global.client.channels.size} channels of ${global.client.guilds.size} guilds.`, 'index.js');
	global.client.user.setStatus('available')
	global.client.user.setActivity("life","at sentinence");
});
global.client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`, 'index.js');
});

global.client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  log(`I have been removed from: ${guild.name} (id: ${guild.id})`, 'index.js');
});

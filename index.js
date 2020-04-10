const fs = require('fs');
const {prefix, mute_time, token} = require('./config.json')
const {log, logError} = require('./commands/log.js')
//const keep_alive = require('./keep_alive.js')
const Discord = require('discord.js');
const path = require('path')
const client = new Discord.Client();
client.commands = new Discord.Collection();
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
		client.commands.set(command.name, command);
	}
}
console.log("commanded");
client.on('message', message => {
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
  }*/
  if (message.content.includes("(╯°□°）╯︵ ┻━┻") && !message.author.bot){
		message.reply('┬─┬ ノ( ゜-゜ノ)');
		log(`Unflipped ${message.author}'s flip in ${message.guild}'s ${message.channel}. Message ID: ${message.id}`,'index.js');
	}
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(1).split(/ +/);

  console.log("Args: "+args);
  console.log(args);
  if(args[0] == ''){
    args.shift();
  }
  console.log(args.length);
	const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

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
		log(`${message.author} attempted to run ${command.name} inside a DM`);
	}

  try {
    console.log("Args here:" + args);
	  command.execute(message, args);
  } catch (error) {
	  logError(error, 'index.js');
	  message.reply('there was an error trying to execute that command!');
  }

});
client.login(token);
/*
console.log("imported");*/
client.on('ready', () => {
  console.log("I'm in - Basic Bot has arrived.");
  console.log(client.user.username);
  log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`, 'index.js');
	client.user.setStatus('available')
	client.user.setActivity("life","at sentinence");
});
client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`, 'index.js');
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  log(`I have been removed from: ${guild.name} (id: ${guild.id})`, 'index.js');
});/*
console.log("Readied");
client.on('message', msg => {
    if (msg.author.id != client.user.id && (msg.content.substring(0,4)=="!bot")) {
        processMessage(msg);
        console.log("Processed message");
    }
    else{
      console.log("Message detected: "+msg.content)
      console.log(msg.content.substring(0,4));
    }
});
function processMessage(msg){
  var text = msg.content.substring(5);
  var list = text.split(' ');
  console.log(list);
  if(list[0] == "priorities"){
    if(list[1] == "add"){
      list.splice(0,2);
      console.log(list);
      priorities.push(list.join(" "));
      console.log(priorities);
      msg.channel.send("Added priority: "+list.join(" "));
    }
    else if(list[1] == "list"){
      if(priorities.length != 0){
        console.log(priorities.join(",\n").toString());
        msg.channel.send(priorities.join(",\n").toString());
      }
      else{
        msg.channel.send("No priorities!");
      }
    }
    else if(list[1] == "remove"){
      list.splice(0,2);
      var temp = list.join(" ");
      if(priorities.includes(temp)){
        var index = priorities.indexOf(temp);
        priorities.splice(index,1);
        msg.channel.send("Removed priority: "+temp);
      }
      else{
        msg.channel.send("That was not found in the priorities list.");
      }
    }
    else if(list[1] == "clear"){
      priorities = [];
      msg.channel.send("Removed all priorities - you lazy person, you have nothing to do!");
    }
  }
  else if(list[0] == "help"){
    msg.channel.send("priorities - add: add a priority,\nlist: list all priorities,\nremove: remove the first instance of the priority if found,\nclear: remove all priorities.\n\ninsult - <name>: OPTIONAL the name to insult. When omitted, insults 'You'");
  }
  else if(list[0] == "insult"){
    if(list.length > 1){
      list.splice(0,1);
      request({
      url: 'http://insult.mattbas.org/api/insult',
      method: 'GET', qs: {'who': list.join(" ")}}, function (error, response, body) { msg.channel.send(body+".")})
    }
    else{

      request({
      url: 'http://insult.mattbas.org/api/insult',
      method: 'GET'}, function (error, response, body) { msg.channel.send(body+".")})
    }
  }
  else{
    msg.channel.send("That command was not found. Try using '!bot help' for a list of available commands.");
  }
}
console.log("msg'd");
client.login(token);*/

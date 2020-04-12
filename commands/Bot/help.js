const {prefix} = require('../../config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const isFile = fileName => {
  if(fileName.includes('sudo')) return false;
  return !fs.lstatSync(fileName).isFile();
}
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	useage: '<[optional]command name>',
	isCommand: true,
	execute(message, args) {
const { commands } = message.client;
console.log('here');
if (!args.length) {
	console.log('args.length');
	//data.push('Here\'s a list of all my commands:');
//data.push(commands.map(command => '`'+command.name+'`').join(', '));
var commandFiles = [];

var commandFolders = fs.readdirSync('./commands').map(fileName => {
  return('./commands/'+fileName);
}).filter(isFile);
console.log(commandFolders);
var is = 0;
for(var i of commandFolders){
	commandFiles.push({'name': i,
'list': []})
console.log(commandFiles);
	var files = fs.readdirSync(i).filter(file => file.endsWith('.js'));
	console.log(files);
	for(var file of files){
		console.log(file);
		try{var temp = require('../../'+i+'/'+file);}catch (err){console.log(err);}
		console.log(temp.name);
		commandFiles[is]['list'].push('`' + temp.name + '`');
		console.log("Files:" + i + '/' + file);
	}
	is++;
}
console.log('yay');
var emba = new Discord.MessageEmbed().setColor('#63e2ff')
																		.setTitle('Help')
																		.setAuthor('Basic Bot', client.avatarURL)
																		.setDescription(`You can send \`${prefix}help <command name>\` to get info on a specific command!`)
																		.setTimestamp();
for(x of commandFiles){
	emba.addField(x['name'].slice(11),x['list'].join(', '),true);
}
console.log('bout');
return message.channel.send(emba);
}else{
const name = args[0].toLowerCase();
const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

if (!command) {
	return message.reply('that\'s not a valid command!');
}
/*
data.push(`**Name:** ${command.name}`);

if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
if (command.description) data.push(`**Description:** ${command.description}`);
if (command.useage) data.push(`**Usage:** ${prefix}${command.name} ${command.useage}`);

/*if(command.aliases){
  var tempAli = { name: 'Aliases', value: command.aliases.join(', '), inline: true };
}else{
  var tempAli = null;
}*//*
if(command.useage){
  var tempUse = { name: 'Usage', value: `${prefix}${command.name} ${command.useage}`, inline: true };
}else{
  var tempUse = null;
}
if(command.description){
  var tempDesc = { name: 'Description', value: command.description, inline: true };
}else{
  var tempDesc = null;
}/*
//console.log(tempAli);
const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(command.name)
	.setAuthor('Basic Bot', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	//.setDescription('Some description here')
	//.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		//tempAli,
    tempDesc,
    tempUse)

	.setTimestamp()
	.setFooter('Basic Bot by onetesseract');
if(command.useage){
  exampleEmbed.addFields( {name:'Usage', value:`${prefix}${command.name} ${command.useage}`, inline:true });
}
if(command.description){
  exampleEmbed.addField({name:'Description',value:command.description,inline:true} );
}
if(command.aliases){
  exampleEmbed.addField({name:'Aliases', value:command.aliases.join(', '), inline:true});
}*/
let emb = new Discord.MessageEmbed().setTitle(`\`${command.name}\``)
																		.setAuthor('Basic Bot', client.avatarURL)
																		.setTimestamp()
																		.setColor('#63e2ff');

if(command.aliases){
  emb.addField('Aliases','`'+command.aliases.join(', ')+'`' );
}
if(command.useage){
  emb.addField('Usage',`\`${prefix}${command.name} ${command.useage}\`` );
}
if(command.description){
  emb.addField('Description',command.description );
}

message.channel.send(emb);
}
	},
};

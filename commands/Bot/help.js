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
	async execute(message, args) {
		const { commands } = message.client;
		var prefix = await global.Servers.findOne({ where: { id: message.guild.id }}).get('prefix');
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
		var emba = new Discord.MessageEmbed().setColor('#000000')
																				.setTitle('Help')
																				.setAuthor(global.client.user.tag, global.client.user.avatarURL())
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
		let emb = new Discord.MessageEmbed().setTitle(`\`${command.name}\``)
																				.setAuthor(global.client.user.tag, global.client.user.avatarURL())
																				.setTimestamp()
																				.setColor('#000000');

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

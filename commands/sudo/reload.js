const fs = require('fs');
module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	useage: '<command name> <class>',
	isCommand: true,
	execute(message, args) {
		if(message.author.id != '692312512900890644') return;
		const commandName = args[0].toLowerCase();
const command = message.client.commands.get(commandName)
	|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
var categ = args[1];
if(!args) return message.reply('no class supplied!');
if(!fs.existsSync(`${global.appRoot}/commands/${categ}/${commandName}.js`)) return message.reply('command not found.')
delete require.cache[require.resolve(`${global.appRoot}/commands/${categ}/${commandName}.js`)];
try {
	const newCommand = require(`${global.appRoot}/commands/${categ}/${commandName}.js`);
	message.client.commands.set(newCommand.name, newCommand);
} catch (error) {
	console.log(error);
	message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
}
message.channel.send(`Command \`${commandName}\` was reloaded!`);
	},
};

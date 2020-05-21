const fs = require('fs');

const isFile = fileName => {
    return !fs.lstatSync(fileName).isFile();
  }

module.exports = {
	name: 'sudo',
	description: 'List hidden commands',
  useage: '',
	isCommand: true,
	async execute(message, args) {
        if(message.author.id != '692312512900890644') return;
        var files = fs.readdirSync('./commands/sudo/').filter(file => file.endsWith('.js'));
        message.reply(`Here are the hidden commands: ${files.join()}`)
	},
};
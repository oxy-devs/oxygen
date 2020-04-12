const fs = require('fs');

module.exports = {
	name: 'recommend',
	description: 'Reccomend features to the devs.',
  useage: '<feature>',
	isCommand: true,
	execute(message, args) {
    if(args.length == 0) return message.reply('please specify a feature.');
    fs.appendFileSync('features.txt', (args.join(' ') + '\n'));
    message.reply(`Recommended feature ${args.join(' ')}`)
	},
};

const ms = require('ms');

module.exports = {
	name: 'afk',
	description: 'View or toggle you AFK status.',
	useage: '<[optional] on | off>',
	isCommand: true,
	execute(message, args) {
        if(args[0] != 'on' && args[0] != 'off'){
			if(global.afk.hasOwnProperty(message.author.id)){
				message.reply('you are afk.');
			}else{
				message.reply('you are not afk.');
			}
		}else if(args[0] == 'on'){
			if(global.afk.hasOwnProperty(message.author.id)){
				message.reply('you are already afk.');
			}else{
				global.afk[message.author.id] = {pings: 0, timestamp: new Date().getTime()};
				message.reply('you are now afk.');
			}
		}else if(args[0] == 'off'){
			if(!global.afk.hasOwnProperty(message.author.id)){
				message.reply('you are already not afk.');
			}else{
				var stuff = global.afk[message.author.id];
				var time = ((new Date().getTime()) - stuff.timestamp);
				time -= (time%1000);
				var doneTime = ms(time);
				delete global.afk[message.author.id];
				message.reply(`you are no longer afk. You had ${stuff.pings} pings over the ${doneTime} you were afk for.`);
			}
		}
	},
};
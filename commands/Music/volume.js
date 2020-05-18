module.exports = {
	name: 'volume',
	description: 'Set volume of music. If no volume is given, it gives the current volume.',
	useage: '<number 1-10>',
    isCommand: true,
    premium: true,
	execute(message, args) {
        
        if(!global.queue[message.guild.id]) return message.reply('no songs are playing!');
        if(args.length == 0) return message.channel.send(`The volume of ${global.queue[message.guild.id].songs[0].title} is at ${(global.queue[message.guild.id].dispatcher.volume * 2.5).toString()}`)
        try{
            var vol = parseInt(args[0]);
            if(vol > 10 || vol < 1) return message.reply('that\'s not between 1 and 10');
            global.queue[message.guild.id].dispatcher.setVolume(vol / 2.5);
        }catch{
            message.reply('is that a valid number?')
        }
	},
};
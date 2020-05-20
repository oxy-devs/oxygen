module.exports = {
	name: 'queue',
	description: 'View the queue.',
	useage: '',
	isCommand: true,
	execute(message, args) {
        if(!global.queue[message.guild.id]) return message.reply('there are no songs playing!');
        var msg = '';
        msg += `Now playing: ${global.queue[message.guild.id].songs[0].title}\nCurrent queue:`;
        global.queue[message.guild.id].songs.slice(1).forEach(song => {
            msg += `\n- ${song.title}`;
        });
        message.channel.send(msg);
	},
};
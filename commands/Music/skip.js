module.exports = {
	name: 'skip',
	description: 'Skips a song.',
  useage: '',
	isCommand: true,
  aliases: ['next'],
	execute(message, args) {
  console.log('here');
    if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!global.queue[message.guild.id]){
    return message.channel.send("There is no song that I could skip!");}
  console.log('there');
  //console.log(global.queue.get(message.guild.id));
  global.queue[message.guild.id].connection.dispatcher.end();
	},
};


  module.exports = {
  	name: 'stop',
  	description: 'Stops the music.',
    useage: '',
  	isCommand: true,
  	execute(message, args) {
      console.log('here');
      if (!message.member.voice.channel){
          return message.channel.send(
            "You have to be in a voice channel to stop the music!"
          );}
          if(!global.queue[message.guild.id]){
            return message.reply('no songs are currently playing!');
          }
        global.queue[message.guild.id].songs = [];
        console.log('there');
        //console.log(global.queue.get(message.guild.id).connection);
        global.queue[message.guild.id].connection.dispatcher.end();
  	},
  };

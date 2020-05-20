global.queue = {};
const ytdl = require('ytdl-core');
const got = require('got');
module.exports = {
	name: 'play',
	description: 'Adds a song to the queue.',
  useage: '<search term>',
	isCommand: true,
	async execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.reply(
        "you are not in a voice channel!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.reply(
        "I have insufficient permissions!"
      );
    }
    var resp = await got(`https://www.googleapis.com/youtube/v3/search/?part=snippet&q=${args.join(' ')}&key=AIzaSyBzhNZXe6c-9pT-2jUHqnUhQwy6PBMwY-w&topicId=/m/o4rlf`);
    resp = JSON.parse(resp.body);
    var item = resp.items[0];
    const song = {
      title: item.snippet.title,
      id: item.id.videoId,
    };
    if(!global.queue[message.guild.id]){
      global.queue[message.guild.id] = {
        songs: [],
        volume: 8,
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        dispatcher: null,
      }
      global.queue[message.guild.id].songs.push(song);
      try{
        var connection = await voiceChannel.join();
        global.queue[message.guild.id].connection = connection;
        play(message.guild, global.queue[message.guild.id].songs[0])
      }catch(err){
        console.log(err);
        global.queue[message.guild.id].textChannel.send('I was unable to connect!')
        voiceChannel.leave();
        delete global.queue[message.guild.id];
      }
    }else{
      global.queue[message.guild.id].songs.push(song);
      global.queue[message.guild.id].textChannel.send(`${song.title} has been added to the queue! Current queue length: ${global.queue[message.guild.id].songs.length - 1}`)
    }
	},
};

function play(guild, song){
  if (!song) {
    global.queue[guild.id].voiceChannel.leave();
    return delete global.queue[guild.id];
  }
  
  global.queue[guild.id].dispatcher = global.queue[guild.id].connection.play(ytdl("https://youtube.com/watch/?v=" + song.id))
                                                                       .on("finish", () => {
                                                                         global.queue[guild.id].songs.shift();
                                                                         play(guild, global.queue[guild.id].songs[0]);
                                                                       })
                                                                       .on("error", error => console.log(error));
  global.queue[guild.id].dispatcher.setVolume(global.queue[guild.id].volume / 4);
  global.queue[guild.id].textChannel.send(`Now playing: **${song.title}**`);
  console.log(`Now playing: **${song.title}**`);
}

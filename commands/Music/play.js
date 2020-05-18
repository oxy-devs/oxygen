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
  var resp = await got(`https://www.googleapis.com/youtube/v3/search/?part=snippet&q=${args.join(' ')}&key=AIzaSyBzhNZXe6c-9pT-2jUHqnUhQwy6PBMwY-w&topicId=/m/o4rlf`)
  console.log(resp);
  resp = JSON.parse(resp.body);
  var item = resp.items[0];
  //const songInfo = await ytdl.getInfo(args[0]);//}catch{/*TODO: search*/ return message.reply("that\'s not a valid youtube URL.");}
const song = {
 title: item.snippet.title,
 url: "https://youtube.com/watch/?v=" + item.id.videoId,
};
console.log(song.url);
if (!global.queue[message.guild.id]) {
  // Creating the contract for our queue
const queueContruct = {
 textChannel: message.channel,
 voiceChannel: voiceChannel,
 connection: null,
 dispatcher: null,
 songs: [],
 volume: 5,
 playing: true,
};
// Setting the queue using our contract
global.queue[message.guild.id] = queueContruct;
// Pushing the song to our songs array
queueContruct.songs.push(song);

try {
 // Here we try to join the voicechat and save our connection into our object.
 var connection = await voiceChannel.join();
 queueContruct.connection = connection;
 // Calling the play function to start a song
 play(message.guild, queueContruct.songs[0]);
} catch (err) {
 // Printing the error message if the bot fails to join the voicechat
 console.log(err);
 return delete global.queue[message.guild.id];
 //return message.channel.send(err);
}
}else {
 global.queue[message.guild.id].songs.push(song);
 //console.log(global.queue.get(message.guild.id).songs);
 return message.channel.send(`${song.title} has been added to the queue! URL: ${song.url}`);
}
	},
};
function play(guild, song) {
  //const serverQueue = queue.get(guild.id);
  console.log(`Now playing: ${song}`);
  if (!song) {
    global.queue[guild.id].voiceChannel.leave();
    delete global.queue[guild.id];
    return;
  }
  const dispatcher = global.queue[guild.id].connection
    .play(ytdl(song.url))
    .on("finish", () => {
        global.queue[guild.id].songs.shift();
        play(guild, global.queue[guild.id].songs[0]);
    })
    .on("error", error => console.error(error));
    global.queue[guild.id].dispatcher = dispatcher;
dispatcher.setVolumeLogarithmic(global.queue[guild.id].volume / 5);
global.queue[guild.id].textChannel.send(`Now playing: **${song.title}**`);
}

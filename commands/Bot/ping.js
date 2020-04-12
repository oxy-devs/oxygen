
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'ping',
	description: 'Ping!',
  useage: '',
	isCommand: true,
	execute(message, args) {
    ping(message);
	},
};
async function ping(message){
  const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. Client latency is ${global.lag} ms.`);
}

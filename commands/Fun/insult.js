const superagent = require('superagent');
const urls ="https://insult.mattbas.org/api/insult.json";
const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: 'insult',
	description: 'Insult someone.',
  useage: '<[optional]name>',
	isCommand: true,
	execute(message, args) {
    console.log("Called insult");
    console.log(args.length);
		if(args.length > 0){
      console.log(args);
      superagent.get(urls+"?who="+encodeURIComponent(args.join(" ")))
    .query()
    .end((err, res) => {
  if (err) { return console.log(err); }
	let emb = new Discord.MessageEmbed().setTitle(JSON.parse(res.text).insult)
																			.setAuthor('Basic Bot', client.avatarURL)
																			.setTimestamp()
																			.setColor('#63e2ff');
  message.channel.send(emb);
  });
    }
    else{
      superagent.get(urls)
    .query()
    .end((err, res) => {
  if (err) { return console.log(err); }
	let emba = new Discord.MessageEmbed().setTitle(JSON.parse(res.text).insult)
																			.setAuthor('Basic Bot', client.avatarURL)
																			.setTimestamp()
																			.setColor('#63e2ff');
  message.channel.send(emba);
  });
    }
	},
};

const randomPuppy = require('random-puppy');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
module.exports = {
	name: 'reddit',
	description: 'Get a random image from the specified subreddit',
  useage: '<subreddit>',
	isCommand: true,
  args: true,
	execute(message, args) {
		fetcher(message, args);
  },
};
async function fetcher(message, args){
	try {
			const { body } = await snekfetch
					.get(`https://www.reddit.com/r/${args[0]}.json?sort=top&t=week`)
					.query({ limit: 800 });//}catch(err){ return message.reply(`an error \` ${err}\` was encountered.`);}
			console.log(body);
			console.log(body.error);/*
			if(body.error != 200){
				return message.reply(`An error ${body['error'].toString()} was encountered.`);
			}*/
			const allowed = body.data.children.filter(post => !post.data.over_18);
			if (!allowed.length) return message.channel.send('It seems we are out of images! Try again later.');
			const randomnumber = Math.floor(Math.random() * allowed.length)
			var title = (allowed[randomnumber].data.title.length > 256) ? allowed[randomnumber].data.title.split(0, 253) + '...' : allowed[randomnumber].data.title
			const embed = new Discord.MessageEmbed()
			.setColor('#63e2ff')
			.setTitle(title)
			.setDescription("Posted by: " + allowed[randomnumber].data.author)
			.setImage(allowed[randomnumber].data.url)
			.addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments);
			message.channel.send(embed)
	} catch (err) {
			console.log(err);
			return message.reply(`an error was encountered. Is ${args[0]} a valid subreddit?`)
	}
}

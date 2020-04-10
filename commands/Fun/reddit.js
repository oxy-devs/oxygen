const randomPuppy = require('random-puppy');
const Discord = require('discord.js');
module.exports = {
	name: 'reddit',
	description: 'Get a random image from the specified subreddit',
  useage: '<subreddit>',
	isCommand: true,
  args: true,
	execute(message, args) {
    randomPuppy(args[0]).then(url => {
      console.log(url);
      let emb = new Discord.MessageEmbed().setColor('#63e2ff')
                                          .setImage(url);
      message.channel.send(emb);
  })
	},
};

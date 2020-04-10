const Discord = require('discord.js');
const superagent = require('superagent');
const randomPuppy = require('random-puppy');
var catMe = require('cat-me')
module.exports = {
	name: 'image',
	description: 'Get a selection of images.',
  useage: '<type - nasa, meme, puppy, cat>',
  args: true,
	isCommand: true,
	execute(message, args) {
    console.log("image");
    if(args[0] == 'nasa'){
      console.log("nasa");
      superagent.get('https://api.nasa.gov/planetary/apod')
    .query({"api_key":"JLoJCkC6DXnJX6C8mW0jmSBAl7uGrNLlR5V27vbb"})
    .end((err, res) => {
  if (err) { return console.log(err); }
  console.log(res.body.url);
  console.log(res.body.explanation);
	let emb = new Discord.MessageEmbed().setDescription(res.body.explanation)
																			.setImage(res.body.url)
																			.setColor('#63e2ff');
  message.channel.send(emb);
});
    }
    else if(args[0] == "meme"){
      console.log("memed");
      superagent.get('http://meme-api.herokuapp.com/gimme')
      .query()
      .end((err, res) => {if (err) {return console.log(err);}
      //message.channel.send("",{files: [res.url]});});
      message.channel.send("",{files: [JSON.parse(res.text).url]});})
    }
    else if(args[0] == "puppy"){
      randomPuppy().then(url => {
        console.log(url);
				let emb = new Discord.MessageEmbed().setColor('#63e2ff')
																						.setImage(url);
				message.channel.send(emb);
    })
	}else if (args[0] == "cat"){
		message.channel.send('```'+catMe()+'```');
	}
    else{message.reply("Not a recognised category: ``"+args[0]+'`');}
	},
};

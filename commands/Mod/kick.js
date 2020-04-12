const Discord = require('discord.js');
module.exports = {
	name: 'kick',
	description: 'Kick a user.',
  useage: '<user> <[optional] reason>',
	isCommand: true,
  perms: 'KICK_MEMBERS',
  guildOnly: true,
	execute(message, args) {
		console.log('here');
	try{
    let member = message.mentions.members.first() || message.server.members.get(args[0]);
		console.log(member);
    if(!message.member.hasPermission("KICK_MEMBERS")){
        message.channel.send("You don't have the permissions to use this command!");
    }
    else{
			console.log('there');
        if(!member){
            //you have to type !kick then @username#1234 as an example
            message.channel.send("Please mention a valid member of this server");
						return console.log('not valid user');
					}
        if(!member.kickable){
            message.channel.send("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
						return console.log('not kickable');
					}

        // slice(1) removes the first part, which here should be the user mention or ID
        // join(' ') takes all the various parts to make it a single string.
        let reason = args.slice(1).join(' ');
        if(!reason)
            reason = "No reason provided";
				console.log(reason);
        member.kick(reason)
            .catch(error => message.channel.send(`Sorry ${message.author} I couldn't kick because of : ${error}`));
				const emb = new Discord.MessageEmbed().setColor('#63e2ff').setAuthor('Basic Bot').setTitle(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
        message.channel.send(emb);
				const ema = new Discord.MessageEmbed().setColor('#63e2ff').setAuthor('Basic Bot').setTitle(`${message.author.name} kicked you from ${message.server.name} because: ${reason}`);
				member.send(ema);
    }
	}catch(err){
		console.log(err);
	}
	},
};

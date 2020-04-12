const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'ban',
	description: 'Bans a member indefinetely.',
  useage: '<member>',
	isCommand: true,
  perms: 'BAN_MEMBERS',
  guildOnly: true,
	execute(message, args) {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    try{

            if(!member){
                return message.channel.send("Please mention a valid member of this server");}
            if(!member.bannable){
                return message.channel.send("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");}

            let reason = args.slice(1).join(' ');
            if(!reason) reason = "No reason provided";

            member.ban(reason)
                .catch(error => message.channel.send(`Sorry ${message.author} I couldn't ban the user`));
            const emb = new Discord.MessageEmbed().setColor('#63e2ff').setAuthor('Basic Bot').setTitle(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
            message.channel.send(emb);
            const ema = new Discord.MessageEmbed().setColor('#63e2ff').setAuthor('Basic Bot').setTitle(`${message.author.name} banned you from ${message.server.name} because: ${reason}`);
						member.send(ema);
    }catch(err){
      console.log(err);
    }

	},
};

const ms = require("ms");
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'timedban',
	description: 'Bans a member for a set value.',
  useage: '<member> <time h/m/s> <[optional] reason>',
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
            args.shift()
            try{
            var rawtime = args.shift();
            let mutetime = ms(rawtime);
            if(!mutetime){
              return message.reply('that\'s not a valid time.');
            }
            global.mutetime = mutetime;
          }catch{
            return message.reply('that\'s not a valid time.');
          }
            let reason = args.join(' ');
            if(!reason) reason = "No reason provided";

            member.ban(reason)
                .catch(error => message.channel.send(`Sorry ${message.author} I couldn't ban the user`));
            const emb = new Discord.MessageEmbed().setColor('#63e2ff').setAuthor('Basic Bot').setTitle(`${member.user.tag} has been banned by ${message.author.tag} for ${rawtime} because: ${reason}`);
            message.channel.send(emb);
            const ema = new Discord.MessageEmbed().setColor('#63e2ff').setAuthor('Basic Bot').setTitle(`${message.author.tag} banned you from ${message.guild.name} for ${rawtime} because: ${reason}`);
						member.send(ema);

    }catch(err){
      console.log(err);
    }
    setTimeout(function(){
      message.guild.members.unban(member);
      message.channel.createInvite({unique: true}).then(invite => {
      const ema = new Discord.MessageEmbed().setColor('#63e2ff').setAuthor('Basic Bot').setTitle(`You have been unbanned from  ${message.guild.name}. Here is an invite: https://discord.gg/${invite.code}`);});
  }, global.mutetime);
	},
};

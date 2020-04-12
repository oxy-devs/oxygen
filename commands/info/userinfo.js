const Discord = require('discord.js');
const moment = require("moment");

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports = {
	name: 'userinfo',
	description: 'Get information about a user.',
  useage: '<user>',
	isCommand: true,
  aliases: ['user'],
	execute(message, args) {
    var permissions = [];
    var acknowledgements = 'None';

    try{var temp = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
      if(!temp) return message.reply('mention a valid user.');
      global.member = temp;}catch{
      return message.reply('mention a valid user.');
    }
    const member = global.member;
    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

    if(message.member.roles.cache.has("KICK_MEMBERS")){
        permissions.push("Kick Members");
    }

    if(message.member.roles.cache.has("BAN_MEMBERS")){
        permissions.push("Ban Members");
    }

    if(message.member.roles.cache.has("ADMINISTRATOR")){
        permissions.push("Administrator");
    }

    if(message.member.roles.cache.has("MANAGE_MESSAGES")){
        permissions.push("Manage Messages");
    }

    if(message.member.roles.cache.has("MANAGE_CHANNELS")){
        permissions.push("Manage Channels");
    }

    if(message.member.roles.cache.has("MENTION_EVERYONE")){
        permissions.push("Mention Everyone");
    }

    if(message.member.roles.cache.has("MANAGE_NICKNAMES")){
        permissions.push("Manage Nicknames");
    }

    if(message.member.roles.cache.has("MANAGE_ROLES")){
        permissions.push("Manage Roles");
    }

    if(message.member.roles.cache.has("MANAGE_WEBHOOKS")){
        permissions.push("Manage Webhooks");
    }

    if(message.member.roles.cache.has("MANAGE_EMOJIS")){
        permissions.push("Manage Emojis");
    }

    if(permissions.length == 0){
        permissions.push("No Key Permissions Found");
    }

    if(`<@${member.user.id}>` == message.guild.owner){
        acknowledgements = 'Server Owner';
    }

    const emb = new Discord.MessageEmbed()
        .setDescription(`<@${member.user.id}>`)
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setColor('#63e2ff')
        .setFooter(`ID: ${message.author.id}`)
        .setThumbnail(member.user.displayAvatarURL)
        .setTimestamp()
        .addField("Status",`${status[member.user.presence.status]}`, true)
        .addField('Joined at: ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
        .addField("Created at: ",`${moment(message.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
        .addField("Permissions: ", `${permissions.join(', ')}`, true)
        .addField(`Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`, true)
        .addField("Acknowledgements: ", `${acknowledgements}`, true);

    message.channel.send(emb);

	},
};

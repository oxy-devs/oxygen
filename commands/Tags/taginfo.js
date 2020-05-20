const Discord = require('discord.js');

module.exports = {
	name: 'taginfo',
	description: 'Retrieve info about a tag',
	useage: '<name - one word>',
    isCommand: true,
    args: true,
	async execute(message, args) {
        const tag = await Tags.findOne({ where: { name: args[0], guild: message.guild.id } });
        if (tag) {
            const emb = new Discord.MessageEmbed().setColor('#000000').setTitle(args[0]).addFields(
                {name: "Created by", value: tag.creator, inline: true},
                {name: "Created at", value: new Date(tag.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), inline: true},
                {name: "Usage", value: tag.usage_count}

            )
            return message.channel.send(emb);
        }
        return message.reply(`${tagName} does not exist.`);
	},
};



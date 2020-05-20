module.exports = {
	name: 'edit',
	description: 'Edit a tag',
	useage: '<name - one word> <content>',
    isCommand: true,
    args: true,
	async execute(message, args) {
        if(args.length < 2) return message.reply('please specify a name and content!')
        const tagName = args.shift();
        const tagDescription = args.join(' ');
        const affectedRows = await Tags.update({ content: tagDescription }, { where: { name: tagName, guild: message.guild.id } });
        if (affectedRows > 0) {
	        return message.reply(`tag ${tagName} was edited.`);
        }
        return message.reply(`could not find a tag with name ${tagName}.`);
	},
};


module.exports = {
	name: 'tags',
	description: 'Retrieve all tags',
	useage: '',
    isCommand: true,
	async execute(message, args) {
        const tagList = await Tags.findAll({ attributes: ['name'], where: {guild: message.guild.id} });
        const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
        return message.channel.send(`List of tags: ${tagString}`);
	},
};
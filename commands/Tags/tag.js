module.exports = {
	name: 'tag',
	description: 'Retrieve a tag',
	useage: '<name - one word>',
    isCommand: true,
    args: true,
	async execute(message, args) {
        const tag = await global.Tags.findOne({ where: { name: args[0], guild: message.guild.id } });
        if (tag) {
            // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
            tag.increment('usage_count');
            return message.channel.send(tag.get('content'));
        }
        return message.reply(`Could not find tag: ${args[0]}`);
	},
};
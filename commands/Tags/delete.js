module.exports = {
	name: 'delete',
	description: 'Delete a tag',
	useage: '<name - one word>',
    isCommand: true,
    args: true,
	async execute(message, args) {
        const rowCount = await Tags.destroy({ where: { name: args [0], guild: message.guild.id } });
        if (!rowCount) return message.reply('that tag did not exist.');

        return message.reply('that tag was successfully obliviated.');
	},
};
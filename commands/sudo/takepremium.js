module.exports = {
	name: 'takepremium',
	description: 'takepremium',
	useage: '',
	isCommand: true,
	async execute(message, args) {
		if(!global.good.includes(message.author.id)) return;
		const affectedRows = await global.Servers.update({ premium: false }, { where: { id: message.guild.id } });
		const server = await global.Servers.findOne(
			{ where: {
				id: message.guild.id
			} }
		)
		if (affectedRows > 0) {
			return message.reply(`operation successful. ${server.get('premium')}`);
		}
		return message.reply(`\`sudo problem?\``);
	},
};
module.exports = {
	name: 'gtfo',
	description: 'Get out!',
	useage: '',
	isCommand: true,
	execute(message, args) {
		if(!global.good.includes(message.author.id)) return;
        global.client.destroy();
        process.exit(0);
	},
};
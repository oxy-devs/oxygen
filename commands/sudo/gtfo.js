module.exports = {
	name: 'gtfo',
	description: 'Get out!',
	useage: '',
	isCommand: true,
	execute(message, args) {
        global.client.destroy();
        process.exit(0);
	},
};
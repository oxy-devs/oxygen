module.exports = {
	name: 'message',
	description: 'Message someone through the bot.',
  useage: '<user id>',
	isCommand: true,
	execute(message, args) {
	if(!global.good.includes(message.author.id)) return;
    message.mentions.users.first().send('It\'s Basic Bot, your one-stop for rabbit pictures?');
    message.reply('messaged user.');
	},
};

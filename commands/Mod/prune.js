module.exports = {
	name: 'prune',
	description: 'Prune a certain number of messages from the channel. Maximun 100.',
	useage: '<number - max 100>',
    isCommand: true,
    args: true,
    perms: 'MANAGE_MESSAGES',
    aliases: ['del','clean'],
	async execute(message, args) {
        if(!parseInt(args[0])) return message.reply('Please enter a valid number!');
        message.channel.bulkDelete(parseInt(args[0])).then(async () => {
            let msg = await message.reply(`deleted ${parseInt(args[0])} messages.`);

            setTimeout(function(){msg.delete()}, 5000)
          });
	},
};
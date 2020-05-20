module.exports = {
	name: 'prefix',
	description: 'Set the bot\'s prefix',
	useage: '<prefix>',
    isCommand: true,
    perms: 'MANAGE_MEMBERS',
    args: true,
	async execute(message, args) {
        try{
            await global.Servers.update({ prefix: args[0] }, { where: { id: message.guild.id } });
            const server = await global.Servers.findOne(
				{ where: { id: message.guild.id } }
            );
            message.reply(`prefix successfully set to ${server.get('prefix')}`);
        }
        catch(e){
            console.log(e);
            message.reply('there was an error while updating the prefix!')
        }
    },
};
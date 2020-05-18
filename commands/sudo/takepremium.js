module.exports = {
	name: 'takepremium',
	description: 'takepremium',
	useage: '',
	isCommand: true,
	execute(message, args) {
		if(message.author.id != '692312512900890644') return;
		global.db.get('servers').find({id: message.guild.id}).set('premium', false).write();
		message.reply(global.db.get('servers').find({id: message.guild.id}).value().premium);
		
	},
};
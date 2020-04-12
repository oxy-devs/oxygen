module.exports = {
	name: 'eval',
	description: 'evil eval()',
  useage: '',
	isCommand: true,
	async execute(message, args) {
    if(message.author.id != '692312512900890644') return;
    var res = await eval(args.join(' '));
    message.channel.send(res);
	},
};

module.exports = {
	name: 'info',
	description: 'Get app info',
  useage: '',
	isCommand: true,
	async execute(message, args) {
    if(message.author.id != '692312512900890644') return;
    console.log(global.uptime);
    let totalSeconds = (global.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);
message.reply(`Hosted at ${global.appRoot}. Uptime: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds.`)
	},
};

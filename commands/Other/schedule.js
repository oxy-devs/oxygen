const ms = require('ms');
const {whenMessage} = require(global.appRoot + '/index.js');
module.exports = {
	name: 'schedule',
	description: 'Schedule a command to run in x hours/minutes/seconds.',
  useage: '<time> <command - eg ping>',
	isCommand: true,
  args: true,
	execute(message, args) {
    if(!(args.length > 1)) return message.reply('invalid arguments.');
    const time = ms(args.shift());
    if(!time)return message.reply('invalid time');
    setTimeout(whenMessage(args.join(' ')), time);
	},
};

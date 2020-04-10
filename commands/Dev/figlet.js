var figlet = require('figlet');
module.exports = {
	name: 'figlet',
	description: 'Figlet text.',
  useage: '',
	isCommand: true,
	execute(message, args) {

      figlet(args.join(' '), function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    message.channel.send('```'+data+'```');
});

	},
};

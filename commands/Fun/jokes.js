const superagent = require('superagent');
module.exports = {
	name: 'joke',
	description: 'Gives you jokes.',
  useage: '<type - dad>',
  args: true,
	isCommand: true,
	execute(message, args) {
    if(args[0]=='dad'){
    superagent.get('http://www.icanhazdadjoke.com')
    .query()
    .set('Accept', 'text/plain')
    .end((err, res) => {
    if (err) { return console.log(err); }
      message.channel.send(res.text);}
      );
	}
  },
};

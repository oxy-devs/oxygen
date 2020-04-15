const fs = require('fs');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const { trelloKey, trelloToken } = require('./token.json');
module.exports = {
	name: 'bugs',
	description: 'Reoprt bugs to the devs.',
  useage: '<bug>',
	isCommand: true,
  aliases: ['report'],
	execute(message, args) {
    if(args.length == 0) return message.reply('please specify a bug.');
    //fs.appendFileSync('features.txt', (args.join(' ') + '\n'));
		const body = { idList: "5e96eac31653f06f07da1aef",
	 								key: trelloKey,
									token: trelloToken,
									name: args.join(' '),
									pos: 'top'};

fetch('https://api.trello.com/1/cards', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => {message.reply('reported bug.')});
	},
};

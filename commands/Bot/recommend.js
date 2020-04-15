const fs = require('fs');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const { trelloKey, trelloToken } = require('../../token.json');
module.exports = {
	name: 'recommend',
	description: 'Reccomend features to the devs.',
  useage: '<feature>',
	isCommand: true,
  aliases: ['suggest'],
	execute(message, args) {
    if(args.length == 0) return message.reply('please specify a feature.');
    //fs.appendFileSync('features.txt', (args.join(' ') + '\n'));
		const body = { idList: "5e96eac413aac64dd814d544",
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
    .then(json => message.reply('reported bug.'));
	},
};
//key: ab0625d9261302b16be0f9fd352766cb
//token: d37bfe57e9a35077d45fffcef0a701fcd8a7deac3bc3e85791ddbda56c8a11cd
//prop: 5e96eac413aac64dd814d544

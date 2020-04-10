var  games = new Map;

module.exports = {
	name: 'roulette',
	description: 'Starts a game of roulette, which will end in one of the participating users being kicked from the server.',
  useage: 'start/bet <red|black>',
  games: new Array,
	isCommand: true,
	execute(message, args) {
    if(args[0] == "start"){return;}
	},
};

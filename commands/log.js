const fs = require('fs');
module.exports = {
	name: 'log',
	description: 'Log!',
  useage: '',
	isCommand: false,
	log(message, origin) {
		var stream = fs.createWriteStream("./log.txt", {flags:'a'});
		stream.write(`[${origin}:${new Date().toJSON()}] ${message}` + "\n");
	},
	logError(message,origin){
		var stream = fs.createWriteStream("./errors.txt", {flags:'a'});
		stream.write(`[${origin}:${new Date().toJSON()}] ${message}` + "\n");
	}
};

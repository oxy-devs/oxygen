const NpmApi = require('npm-api');
const Discord = require('discord.js');
let npm = new NpmApi();
module.exports = {
	name: 'npm',
	description: 'NPM stuff.',
  useage: '',
	isCommand: true,
  args: true,
	execute(message, args) {
    npmer(message,args);
	},
};
async function npmer(message, args){
  if(args[0] == "package" && args.length > 1){
    var repo =  npm.repo(args[1]);
    console.log(repo);
    let licence = await repo.prop('license');
    let engines = await repo.prop('engines');
    let owner = await repo.prop('author');
    let mortal = '';
    for(p in engines){
      mortal += p + ': ' + engines[p]+ '\n';
    }
    const emb = new Discord.MessageEmbed().setColor('#63e2ff')
                              .setTitle(await repo.prop('name'))
                              .setDescription(await repo.prop('description'))
                              .addField('Licence', licence)
                              .setAuthor(owner['name'])
                              .addField('Engines', mortal);
    message.channel.send(emb);
    console.log(await repo.prop('name'),await repo.prop('description'), await repo.prop('engines'), await repo.prop('author'))
}
}

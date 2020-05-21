const NpmApi = require('npm-api');
const Discord = require('discord.js');
let npm = new NpmApi();
module.exports = {
	name: 'npm',
	description: 'Get info about an NPM package.',
  useage: '<package-name>',
	isCommand: true,
  args: true,
	execute(message, args) {
    npmer(message,args);
	},
};
async function npmer(message, args){
    var repo =  await npm.repo(args[0].toLowerCase());
    if(!repo) return message.reply('that package was not found!');
    console.log(repo);
    let license = await repo.prop('license');
    let engines = await repo.prop('engines');
    let owner = await repo.prop('author');
    let mortal = '';
    if(!engines) mortal = 'Engines unspecified';
    if(!owner){ owner = 'Author unspecified'; }else{owner = owner['name']}
    if(!license) license = 'License unspecified';
    for(p in engines){
      mortal += p + ': ' + engines[p]+ '\n';
    }
    const emb = new Discord.MessageEmbed().setColor('#000000')
                              .setTitle(await repo.prop('name'))
                              .setDescription(await repo.prop('description'))
                              .addField('Licence', license)
                              .setAuthor(owner)
                              .addField('Engines', '`'+mortal+'`');
    message.channel.send(emb);
    console.log(await repo.prop('name'),await repo.prop('description'), await repo.prop('engines'), await repo.prop('author'))
}

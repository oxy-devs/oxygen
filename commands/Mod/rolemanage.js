const Discord = require('discord.js');
let possible = [
    '🇦',
    '🇧',
    '🇨',
    '🇩',
    '🇪'];
module.exports = {
	name: 'rolemanage',
	description: 'Creates a role managing embed.',
    useage: '<roles>',
    isCommand: true,
    perms: 'MANAGE_ROLES',
    args: true,
    guildOnly: true,
	async execute(message, args) {
        try{
        
        if(!message.mentions.roles) return message.reply('please mention at least one role!');
        if(message.mentions.roles.length > 5) return message.reply('too many roles! The limit is 5.')
        const emb = new Discord.MessageEmbed().setColor('#63e2ff').setTitle('Select role(s) to assign to yourself.');
        let roles = message.mentions.roles.array().sort();
        let allowed = [];
        console.log(Array.from(message.mentions.roles.array()));
        roles.forEach((val, i) => {
            allowed.push(possible[i]);
            emb.addField(val.name, possible[i], true);
        });
        const filter = (reaction, user) => {
            return allowed.includes(reaction.emoji.name) && !user.bot;
        };
        let sent = await message.channel.send(emb);
        allowed.forEach(value => {sent.react(value)});
        //const collector = sent.createReactionCollector(filter);
        const beta = sent.createReactionCollector(filter);
        //collector.on('collect', (reaction, user) => {
        //    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        //    let member = message.guild.members.cache.filter(val => val.user.id == user.id)[0];
        //    member.roles.add(roles[allowed.indexOf(reaction.emoji.identifier)]);
        //});
        beta.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            if(user.bot) return;
            console.log(reaction.emoji.name == '🇦')
            let member = message.guild.member(user);
            console.log(allowed);
            console.log(allowed.indexOf(reaction.emoji.name));
            let role = roles[allowed.indexOf(reaction.emoji.name)];
            //console.log(role);
            member.roles.add(role);
            console.log(member.roles);
        });
        }
        catch(err){
            console.log(err);
        }

	},
};
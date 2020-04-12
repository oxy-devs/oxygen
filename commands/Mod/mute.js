const ms = require('ms');
module.exports = {
	name: 'mute',
	description: 'Mute a person for a specified time.',
  useage: '',
	isCommand: true,
  perms: 'MANAGE_MESSAGES',
	execute(message, args) {
    mute(message, args);
	},
};
async function mute(message, args){
  try{
  let mutee = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  console.log(mutee);
if(!mutee) return message.reply("couldn't find user.");
if(mutee.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
let muterole = message.guild.roles.cache.find(role => role.name == 'Basically muted');
//start of create role
if(!muterole){
  try{
    muterole = await message.guild.roles.create({
  data: {
    name: 'Basically muted',
    color: '#000000',
    permissions:[]
  },
  reason: 'Basic Bot\'s Mute Role'
})
    var chunnels = message.guild.channels;
    console.log(chunnels)/*
    for(channel in chunnels){
      await channel.overwritePermissions([
  {
     id: muterole.id,
     deny: ['SEND_MESSAGES','ADD_REACTIONS']
  }]);
      console.log(channel);
    }*/
    message.guild.channels.cache.forEach(async (channel) => {
      await channel.overwritePermissions([
  {
     id: muterole.id,
     deny: ['SEND_MESSAGES','ADD_REACTIONS']
  }]);
    });

  }catch(e){
    console.log(e.stack);
  }
}
//end of create role
let mutetime = args[1];
if(!mutetime) return message.reply("You didn't specify a time!");

await(mutee.roles.add(muterole.id));
message.channel.send(`<@${mutee.id}> has been muted for ${ms(ms(mutetime))} by ${message.author}`);
try{mutee.user.send('You have been muted ')

setTimeout(function(){
  mutee.roles.remove(muterole.id);
  message.channel.send(`<@${mutee.id}> has been unmuted!`);
}, ms(mutetime));}catch(err){
  console.log(err);
}
}catch(err){
  return;
}
}

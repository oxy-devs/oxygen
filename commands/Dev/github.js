const Discord = require('discord.js');
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();
const superagent = require('superagent');
module.exports = {
	name: 'github',
	description: 'Github stuff.',
  useage: '[repo <owner> <name>]/[readme <owner> <name>]',
	isCommand: true,
  args: true,
	execute(message, args) {
    if(args[0] == "repos" && args.length == 2){
      octokit.repos
  .listForOrg({
    org: args[1],
    type: "public"
  })
  .then(({ data }) => {
    console.log(data[0]);
    //data = JSON.parse(data);
    console.log(data[0]['full_name']);
    const emb = new Discord.MessageEmbed().setColor('#63e2ff');
    data.forEach(function(value){
      emb.addField(value['full_name'], value['description'], true);
    });
  message.channel.send(emb);
  });
    }
    else if (args[0] == "repo" && args.length == 3){
      console.log("repoing");
      octokit.repos.get({
  owner: args[1],
  repo: args[2],
}).then(({data}) => {
  console.log(data);
  const emb = new Discord.MessageEmbed()
	.setColor('#63e2ff')
	.setTitle(data['full_name'])
	.setURL(data['html_url'])
	.setAuthor(data['owner']['login'], data['owner']['avatar_url'], data['owner']['html_url'])
	.setTimestamp();
	//.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
  if(data['open_issues_count'] > 0){
    emb.addField('Open issues', data['open_issues_count'].toString());
  }
  if(data['description'] != null){
    emb.setDescription(data['description']);
  }
  let created = new Date(data['created_at'].toString());
  let pushed = new Date(data['pushed_at'].toString());

  emb.addField('Created at', `${created.getDate()}-${created.getMonth()}-${created.getFullYear()}`);
  emb.addField('Last pushed at', `${pushed.getDate()}-${pushed.getMonth()}-${pushed.getFullYear()}`);
  emb.addField('Forks',data['forks'].toString());
  message.channel.send(emb);
})
    }
    else if (args[0] == "readme" && args.length == 3){
      superagent.get(`https://raw.githubusercontent.com/${args[1].toLowerCase()}/${args[2].toLowerCase()}/master/README.md`)
    .query()
    .end((err, res) => {if(res['text'] == '404: Not Found'){
      message.reply('that readme.md was not found!');
    }else{
      const emb = new Discord.MessageEmbed().setColor('#63e2ff');
                                            //.addField('Readme.md',res['text']);
      if(res['text'].length > 1024){
        console.log((res['text'].slice(0,1020)+'...').length);
        emb.addField('Readme.md',res['text'].slice(0,1020)+'...');
      }else{
        emb.addField('Readme.md',res['text']);
      }
      message.channel.send(emb);
    }});
    }
	},
};

const whoiser = require('whoiser');
var ip = require('ip-info');
module.exports = {
	name: 'ip',
	description: 'Provides info about an ip or a domain',
  useage: '<ip or domain>',
	isCommand: true,
  args: true,
	execute(message, args) {
    (async () => {

    // WHOIS info with auto-discovering for WHOIS server
    let domainInfo = await whoiser(args[0]);

    console.log(domainInfo);
    for(p in domainInfo){
      return;
    }
})();/*
ip({
    ip: '8.8.8.8'
}).then(res => {
    console.log(res);
}).catch(err => {
    // deal with error
    console.log(err);*/
	},
};

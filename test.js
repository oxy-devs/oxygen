const got = require('got');

async function main() {var resp = await got('https://www.googleapis.com/youtube/v3/search/?&part=snippet&q=high hopes&topicId=/m/o4rlf');
console.log(resp);}
main();

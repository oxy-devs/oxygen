const { ShardingManager } = require('discord.js');
const { token } = require('./token.json')
global.manager = new ShardingManager('./bot.js', { token: token });

global.manager.spawn();
global.manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

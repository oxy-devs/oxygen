const { ShardingManager } = require('discord.js');
const { token } = require('./token.json')
manager = new ShardingManager('./bot.js', { token: token });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

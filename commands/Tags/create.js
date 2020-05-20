module.exports = {
	name: 'create',
	description: 'Create a tag',
	useage: '<name - one word> <content>',
	isCommand: true,
	async execute(message, args) {
        if(args.length < 2) return message.reply('please specify a name and content!');
        const tagName = args.shift();
        const tagContent = args.join(' ');
        try {
            // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
            const tag = await global.Tags.create({
                guild: message.guild.id,
                name: tagName,
                content: tagContent,
                creator: message.author.tag,
            });
            return message.reply(`tag \`${tag.name}\` added.`);
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.reply('that tag already exists.');
            }
            console.log(e);
            return message.reply('something went wrong with adding a tag.');
        }
	},
};
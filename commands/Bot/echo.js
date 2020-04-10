module.exports = {
	name: 'echo',
	description: 'Echoes a message',
  useage: '<text>',
  aliases: ['say'],
  args: true,
	isCommand: true,
	execute(message, args) {
    console.log(args.length);
    console.log(args);
    if(args.length == 0) return message.reply('Please specify a message to echo!');
    console.log("Args:"  + args);
    const sayMessage = args.join(" ");
    const user = message.author;
    console.log(user);

    console.log(sayMessage);
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    console.log("deleting");
    message.delete().catch(error=>{console.error(error)});
    console.log("deleted");
    // And we get the bot to say the thing:
    message.channel.send(`User ${user} said ${sayMessage}`)
	},
};

# Basic Bot
A basic bot I made because I had nothing better to do.

# Adding commands
All commands are in a folder determining their classification. Commands in the `sudo` folder are not indexed or shown by the `help` command.

Commands may export the following properties (not optional if not specified): 
+ `name` - `string` - the name of the command when it's run.
+ `description` - `string` - the description of the command shown in `help`. Optional for `sudo` commands.
+ `args` - `boolean` - whether the command needs one or more arguments. Optional. If excluded the program assumes false.
+ `perms` - `Array<string>` - the permissions needed by the user to run this command.
+ `execute` - `function` - the code that the command actually runs.
+`isCommand` - `boolean` - whether the command handler treats it as a command or a utility inside of the bot.

Add a command by a pull request.

# Installation
Ensure you have nodejs and npm on your machine. I may have acidentally not gitignored the node_modules but I don't know what that means. Run `npm i` anyway.
In the root of the project add a `token.json` file with your bot token in it, looking something like this:
```json
{
  "token": "your-token-here"
}
```
 Run the bot with `node index.js`

# Basic Bot
A basic bot I made because I had nothing better to do.

#Adding commands
All commands are in a folder determining their classification. Commands in the `sudo` folder are not indexed or shown by the `help` command.

Commands may export the following properties (not optional if not specified): 
+ `name` - `string` - the name of the command when it's run.
+ `description` - `string` - the description of the command shown in `help`. Optional for `sudo` commands.
+ `args` - `boolean` - whether the command needs one or more arguments. Optional. If excluded the program assumes false.
+ `perms` - `Array<string>` - the permissions needed by the user to run this command.

Add a command by a pull request.
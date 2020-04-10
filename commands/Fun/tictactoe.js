var ongoingGames = require('../../tics.json');
const fs = require('fs');
module.exports = {
  name: 'tictactoe',
  description: 'Play a game of tictactoe against the server.',
  useage: '<play (*move* e.g. A1)>/<start>',
  aliases: ['tic', 'noughtsandcrosses'],
  args: true,
  isCommand: true,
  execute(message, args) {
    if(args[0] == "play"){
      if(args.length > 1 && ongoingGames.has(message.user)){
      userPlay(message, args[1]);
      }else if(ongoingGames.has(message.user)){
        message.reply("you did not specify a position to play!")
      }else{
        message.reply("you do not have an ongoing game!")
      }
    }
    function userPlay(message, place){
      //check input
      console.log(place);
      console.log(place.length);
      console.log(place.charAt(0).toLowerCase())
      console.log(['a','b','c'].includes(place.charAt(0).toLowerCase()));
      if(place.length == 2 && ['a','b','c'].includes(place.charAt(0).toLowerCase()) && [1,2,3].includes(parseInt(place.charAt(1)))){
        if (place.charAt(0) == 'a') {
        number = 0;
      }
      if (place.charAt(0) == 'b') {
        number = 3;
      }
      if (place.charAt(0) == 'c') {
        number = 6;
      }
      number += parseInt(place.charAt(1)) -1;
      var temp2 = ongoingGames["ongoingGames"][message.user];
      console.log("Temp2: "+temp2[number]);
      if(temp2[number] == ' '){
      temp2[number] = "X";
      ongoingGames["ongoingGames"]["message.user"] = temp2;
      fs.writeFileSync('tics.json',ongoingGames)
      playRandom(message.user);}
      else{
        message.reply("that space is taken.")
      }
      }
      else{message.reply("invalid input.");}
    }
    function getBoardValue(place, message) {
      console.log(place);
      var number = 0;
      if (place.charAt(0) == 'a') {
        number = 0;
      }
      if (place.charAt(0) == 'b') {
        number = 3;
      }
      if (place.charAt(0) == 'c') {
        number = 6;
      }
      number += parseInt(place.charAt(1)) -1;
      return ongoingGames.get(message)[number];
    }
    function board(message){ return `\`\`\`
		      A   B   C
		    +---+---+---+
		1   | ${getBoardValue("a1".toString(), message)} | ${getBoardValue("b1".toString(), message)} | ${getBoardValue("c1".toString(), message)} |
		    +---+---+---+
		2   | ${getBoardValue("a2".toString(), message)} | ${getBoardValue("b2".toString(), message)} | ${getBoardValue("c2".toString(), message)} |
		    +---+---+---+
		3   | ${getBoardValue("a3".toString(), message)} | ${getBoardValue("b3".toString(), message)} | ${getBoardValue("c3".toString(), message)} |
		    +---+---+---+\`\`\`
	`;}
    if (args[0] == 'start') {
      if(ongoingGames.has(message.user)){
        message.reply("you already have an ongoing game!");
        return;
      }
      message.reply("starting game! I'll play first, as noughts.");
      ongoingGames.set(message.user, [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', message]);
      playRandom(message.user);
    }
    function playRandom(message) {//got to here
      var state = checkWinState(message);
      console.log(state);
      if(state != ' '){
        if(state == 'O'){
          ongoingGames.get(message)[9].reply(`well done, you **lost!** Here is the finishing board:\n ${board(message)}`);
          ongoingGames.delete(message);
          return ;
        }
        else if(state == 'X'){
          ongoingGames.get(message)[9].reply(`well done, you **won!** Here is the finishing board:\n ${board(message)}`);
          ongoingGames.delete(message);
          return ;
        }
        else if(state == "draw"){
          ongoingGames.get(message)[9].reply(`well done, you **drew!** Here is the finishing board:\n ${board(message)}`);
          ondoingGames.delete(message);
          return;
        }

      }
      var temp3;
      for (i = 0; i<ongoingGames.get(message).length -1; i++) {
        temp3 = ongoingGames.get(message);
        if (temp3[i] == ' ') {
          temp3[i] = 'O';
          ongoingGames.set(message,temp3);
          var state = checkWinState(message);
      console.log(state);
      if(state != ' '){
        if(state == 'O'){
          ongoingGames.get(message)[9].reply(`well done, you **lost!** Here is the finishing board:\n ${board(message)}`);
          ongoingGames.delete(message);
          return ;
        }
        else if(state == 'X'){
          ongoingGames.get(message)[9].reply(`well done, you **won!** Here is the finishing board:\n ${board(message)}`);
          ongoingGames.delete(message);
          return ;
        }
        else if(state == "draw"){
          ongoingGames.get(message)[9].reply(`well done, you **drew!** Here is the finishing board:\n ${board(message)}`);
          ondoingGames.delete(message);
          return;
        }

      }
          ongoingGames.get(message)[9].reply(`your turn. Here is the board:\n${board(message)}`);
          return;
        }
      }
    }
      function checkWinState(message) {
        var temp = ongoingGames.get(message);
        console.log("Temp: "+ongoingGames.get(message));
        if (temp[0] == temp[1] && temp[1] == temp[2]) {
          console.log("Temp0 :" + temp[0]);
          return temp[0];
        }
        else if (temp[3] == temp[4] && temp[4] == temp[5]) {
          return temp[3];
        }
        else if (temp[6] == temp[7] && temp[7] == temp[8]) {
          return temp[6];
        }
        else if (temp[0] == temp[3] && temp[3] == temp[6]) {
          return temp[0];
        }
        else if (temp[1] == temp[4] && temp[4] == temp[7]) {
          return temp[1];
        }
        else if (temp[2] == temp[5] && temp[5] == temp[8]) {
          return temp[2];
        }
        else if (temp[0] == temp[4] && temp[4] == temp[8]) {
          return temp[0];
        }
        else if (temp[2] == temp[4] && temp[4] == temp[6]) {
          return temp[2];
        }
        else if(!temp.includes(' ')){
          return("draw");
        }
        return ' ';
      }

  },
};

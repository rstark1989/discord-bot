module.exports = {
  //prefix and description - prefix is necessary to trigger command, description ensures it shows in |help.
  prefix: "roll",
  description: "Rolls a random die for you. Use the format 'roll d<number>'.",
  command: function(message) {
    const arguments = message.content.split(" ");
    if (arguments[1].length === 1) {
      message.channel.send(
        `I am terribly sorry, ${message.author}, but I cannot find my dice right now. Please try again.`
      );
      return;
    }
    const dice = arguments[1].split("");
    //argument needs to start with "d"
    if (dice[0] !== "d") {
      message.channel.send(
        `I am terribly sorry, ${message.author}, but I cannot find my dice right now. Please try again.`
      );
      return;
    }
    dice.splice(0, 1);
    const dievalue = dice.join("");
    const random = parseInt(dievalue);
    //if d is not followed by number, this avoids the error.
    if (isNaN(random)) {
      message.channel.send(
        `My apologies, ${message.author}, but I do not seem to have a "${dievalue}-sided" die. Please try again.`
      );
      return;
    }
    const result = Math.floor(Math.random() * random + 1);
    message.channel.send(
      `You rolled a ${dievalue}-sided die and got: ${result}!`
    );
  }
};

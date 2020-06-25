module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "roll",
  description: "Rolls a random die for you. Use the format 'roll d<number>'.",
  command: function (message) {
    const arguments = message.content.split(" ");
    if (arguments[1].length === 1) {
      message.channel.send(
        `ERROR 404: ${message.author}, missing dice argument.`
      );
      return;
    }
    const dice = arguments[1].split("");
    //argument needs to start with "d"
    if (dice[0] !== "d") {
      message.channel.send(
        `ERROR 404: ${message.author}, invalid argument syntax.`
      );
      return;
    }
    dice.splice(0, 1);
    const dievalue = dice.join("");
    const random = parseInt(dievalue);
    //if d is not followed by number, this avoids the error.
    if (isNaN(random)) {
      message.channel.send(
        `ERROR 400: ${message.author}, "${dievalue}" is not a valid number.`
      );
      return;
    }
    const result = Math.floor(Math.random() * random + 1);
    message.channel.send(
      `BEEP BOOP: You rolled a ${dievalue}-sided die and got: ${result}!`
    );
  },
};

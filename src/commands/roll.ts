import { CommandInt } from "../interfaces/CommandInt";

export const roll: CommandInt = {
  prefix: "roll",
  description: "Rolls a random die for you of **number** sides.",
  parameters:
    "`<d number`>: number of sides to use on die; **must** be prefaced with the letter d, like d20",
  command: (message) => {
    const cmdArguments = message.content.split(" ");
    if (cmdArguments.length < 2 || cmdArguments[1].length < 2) {
      message.channel.send("Sorry, but what die did you want me to roll?");
      return;
    }
    const dice: Array<string> = cmdArguments[1].split("");
    if (dice[0] !== "d") {
      message.channel.send("Sorry, but that is not a valid die.");
      return;
    }
    dice.splice(0, 1);
    const dieValue: string = dice.join("");
    const random = parseInt(dieValue);
    if (isNaN(random)) {
      message.channel.send(`Sorry, but "${dieValue}" is not a valid number.`);
      return;
    }
    const result = Math.floor(Math.random() * random + 1);
    message.channel.send(
      `You rolled a ${dieValue}-sided die and got: ${result}!`
    );
  },
};

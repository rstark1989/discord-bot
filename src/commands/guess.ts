import { CommandInt } from "../interfaces/CommandInt";
import { MessageCollector, TextChannel, Message } from "discord.js";

export const guess: CommandInt = {
  prefix: "guess",
  description:
    "Play a Guess the Number game! Bot will choose a number between 1 and 1000. Players have 10 seconds to guess. Closest guess wins!",
  parameters: "*none*",
  command: (message) => {
    const random = Math.floor(Math.random() * 1000) + 1;
    const guesses: Array<Array<string>> = [];
    message.channel.send(
      "BEEP BOOP: Game initiated. Number between 1 and 1000 chosen. Submit guesses."
    );
    const guessCollector: MessageCollector = new MessageCollector(
      message.channel as TextChannel,
      (m: Message) => !isNaN(parseInt(m.content)),
      { time: 10000 }
    );
    guessCollector.on("collect", (reply) => {
      guesses.push([reply.author.id, parseInt(reply.content)]);
    });
    setTimeout(winner, 10000);
    function winner() {
      let winVal = 1000,
        winAuth,
        winGuess;
      guesses.forEach((el) => {
        if (Math.abs(parseInt(el[1]) - random) < winVal) {
          winVal = Math.abs(parseInt(el[1]) - random);
          winAuth = el[0];
          winGuess = el[1];
        }
      });
      message.channel.send(
        `BEEP BOOP: Calculating winner... <@!${winAuth}>! Correct number was ${random} and the winning guess was ${winGuess}.`
      );
    }
  },
};

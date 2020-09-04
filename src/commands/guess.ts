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
      "Can we play a game? I have chosen a number between 1 and 1000. You have 10 seconds to guess the number. The closest guess will win!"
    );
    const guessCollector: MessageCollector = new MessageCollector(
      message.channel as TextChannel,
      (m: Message) => !isNaN(parseInt(m.content)),
      { time: 10000 }
    );
    guessCollector.on("collect", (reply) => {
      guesses.push([reply.author.id, parseInt(reply.content)]);
    });
    const winner = () => {
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
        `And the winner is... <@!${winAuth}>! My number number was ${random} and the winning guess was ${winGuess}.`
      );
    };
    setTimeout(winner, 10000);
  },
};

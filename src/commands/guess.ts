import { commandInt } from "../interfaces/commandInt";
import { MessageCollector, TextChannel, Message } from "discord.js";

export const guess: commandInt = {
  prefix: "guess",
  description:
    "Play a Guess the Number game! Bot will choose a number between 1 and 1000. Players have 10 seconds to guess. Closest guess wins!",
  parameters: "*none*",
  command: (message) => {
    const random = Math.floor(Math.random() * 1000) + 1;
    const guesses: Array<any> = [];
    message.channel.send(
      "BEEP BOOP: Game initiated. Number between 1 and 1000 chosen. Submit guesses."
    );
    const guessListener: MessageCollector = new MessageCollector(
      message.channel as TextChannel,
      (m: Message) => !isNaN(parseInt(m.content)),
      { time: 10000 }
    );
    guessListener.on("collect", (reply) => {
      guesses.push([reply.author.id, parseInt(reply.content)]);
    });
    setTimeout(winner, 10000);
    function winner() {
      let winval = 1000,
        winauth,
        winguess;
      guesses.forEach((el) => {
        if (Math.abs(el[1] - random) < winval) {
          winval = Math.abs(el[1] - random);
          winauth = el[0];
          winguess = el[1];
        }
      });
      message.channel.send(
        `BEEP BOOP: Calculating winner... <@!${winauth}>! Correct number was ${random} and the winning guess was ${winguess}.`
      );
    }
  },
};

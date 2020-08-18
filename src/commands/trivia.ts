import { CommandInt } from "../interfaces/CommandInt";
import fetch from "node-fetch";
import {
  MessageEmbed,
  MessageCollector,
  TextChannel,
  Message,
} from "discord.js";
import { TriviaInt } from "../interfaces/TriviaInt";

export const trivia: CommandInt = {
  prefix: "trivia",
  description:
    "Provides a trivia question. 10 seconds later, will provide the answer.",
  parameters: "*none*",
  command: async (message) => {
    const letters = ["A", "B", "C", "D"];
    const data = await fetch(
      "https://opentdb.com/api.php?amount=1&type=multiple"
    );
    const parsedData: TriviaInt = await data.json();
    const question = parsedData.results[0];
    const answers = question.incorrect_answers.map((el) =>
      el.replace(/&quot;/g, `"`)
    );
    answers.push(question.correct_answer.replace(/&quot;/g, `"`));
    answers.sort();
    const correct: string[] = [];
    const correctAnswer =
      letters[answers.indexOf(question.correct_answer.replace(/&quot;/g, `"`))];
    const triviaEmbed = new MessageEmbed()
      .setTitle(question.category)
      .setDescription(question.question.replace(/&quot;/g, `"`))
      .addFields(
        { name: "A", value: answers[0] },
        { name: "B", value: answers[1] },
        { name: "C", value: answers[2] },
        { name: "D", value: answers[3] }
      );
    message.channel.send(triviaEmbed);
    const collector = new MessageCollector(
      message.channel as TextChannel,
      (m: Message) => !!m,
      { time: 10000 }
    );
    collector.on("collect", (reply: Message) => {
      if (
        reply.content === correctAnswer &&
        correct.indexOf(`<@!${reply.author.id}>`) === -1
      ) {
        correct.push(`<@!${reply.author.id}>`);
      }
    });
    setTimeout(() => {
      message.channel.send(
        `The correct answer is... ${correctAnswer}: ${question.correct_answer.replace(
          /&quot;/g,
          `"`
        )}!`
      );
      message.channel.send(
        correct.length
          ? `Congratulations to ${correct.join(", ")}!`
          : `No one got this question correct. :(`
      );
    }, 10000);
  },
};

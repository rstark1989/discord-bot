import { CommandInt } from "../interfaces/CommandInt";
import fetch from "node-fetch";
import { JokeInt } from "../interfaces/JokeInt";
import { MessageEmbed } from "discord.js";

export const joke: CommandInt = {
  prefix: "joke",
  description: "Returns a random joke.",
  parameters: "*none*",
  command: async (message) => {
    const data = await fetch("https://icanhazdadjoke.com/", {
      method: "get",
      headers: {
        Accept: "application/json",
        "User-Agent":
          "NHBot (https://www.nhcarrigan.com/discord-bot-documentation",
      },
    });
    const jokeData: JokeInt = await data.json();
    if (jokeData.status !== 200) {
      message.channel.send(
        "Sorry, but I am not really in the mood for a joke right now..."
      );
      return;
    }
    const jokeEmbed = new MessageEmbed()
      .setTitle("Haha!")
      .setDescription(jokeData.joke);
    message.channel.send(jokeEmbed);
  },
};

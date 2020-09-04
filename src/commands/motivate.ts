import { CommandInt } from "../interfaces/CommandInt";
import * as quotes from "../resources/motivational-quotes.json";
import { MessageEmbed } from "discord.js";

export const motivate: CommandInt = {
  prefix: "motivate",
  description:
    "Provides a little bit of motivation, courtesy of [freeCodeCamp](https://freecodecamp.org).",
  parameters: "*none*",
  command: (message) => {
    const motivations = quotes.motivationalQuotes;
    const random = Math.floor(Math.random() * motivations.length);
    const motivationEmbed = new MessageEmbed()
      .setTitle("Time to get motivated!")
      .setDescription(motivations[random].quote)
      .setFooter(motivations[random].author);
    message.channel.send(motivationEmbed);
    return;
  },
};

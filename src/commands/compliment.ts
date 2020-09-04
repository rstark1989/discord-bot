import { CommandInt } from "../interfaces/CommandInt";
import * as quotes from "../resources/motivational-quotes.json";
import { MessageEmbed } from "discord.js";

export const compliment: CommandInt = {
  prefix: "compliment",
  description:
    "Provides a nice little compliment, courtesy of [freeCodeCamp](https://freecodecamp.org).",
  parameters: "*none*",
  command: (message) => {
    const compliments = quotes.compliments;
    const random = Math.floor(Math.random() * compliments.length);
    const complimentEmbed = new MessageEmbed()
      .setTitle("Hello! I hope you are having a good day!")
      .setDescription(compliments[random])
      .setFooter("We love you. 💜");
    message.channel.send(complimentEmbed);
    return;
  },
};

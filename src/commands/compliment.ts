import { commandInt } from "../interfaces/commandInt";
import * as quotes from "../resources/motivational-quotes.json";
import { MessageEmbed } from "discord.js";

export const compliment: commandInt = {
  prefix: "compliment",
  description:
    "Provides a nice little compliment, courtesy of [freeCodeCamp](https://freecodecamp.org).",
  command: (message) => {
    const compliments = quotes.compliments;
    const random = Math.floor(Math.random() * compliments.length);
    const complimentEmbed = new MessageEmbed()
      .setTitle("BEEP BOOP: Dispensing motivation.")
      .setDescription(compliments[random])
      .setFooter("We love you. 💜");
    message.channel.send(complimentEmbed);
    return;
  },
};

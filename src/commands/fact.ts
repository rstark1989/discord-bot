import { CommandInt } from "../interfaces/CommandInt";
import fetch from "node-fetch";
import { FactInt } from "../interfaces/FactInt";
import { MessageEmbed } from "discord.js";

export const fact: CommandInt = {
  prefix: "fact",
  description: "Returns a fun fact!",
  parameters: "*none*",
  command: async (message) => {
    const data = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    const factData: FactInt = await data.json();
    const factEmbed = new MessageEmbed()
      .setTitle("Fun Fact!")
      .setDescription(factData.text)
      .setURL(factData.source_url);
    message.channel.send(factEmbed);
  },
};

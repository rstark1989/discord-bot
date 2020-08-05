import { commandInt } from "../interfaces/commandInt";
import fetch from "node-fetch";
import { MessageEmbed } from "discord.js";
import { dndschoolInt } from "../interfaces/dndschoolInt";

export const dndschool: commandInt = {
  prefix: "dndschool",
  description:
    "Gets information on the provided Dungeons and Dragons **school** of magic.",
  parameters: "`<school>`: name of the school of magic to search",
  command: async (message) => {
    const query = message.content.split(" ").slice(1).join("-");
    if (!query) {
      message.channel.send("ERROR 400: No query provided.");
      return;
    }
    const school = await fetch(
      "https://www.dnd5eapi.co/api/magic-schools/" + query
    );
    const data: dndschoolInt = await school.json();
    if (!data || data.error) {
      message.channel.send("ERROR 404: Not found.");
      return;
    }
    const embed = new MessageEmbed()
      .setTitle(data.name)
      .setDescription(data.desc)
      .setURL("https://www.dnd5eapi.co" + data.url);
    message.channel.send(embed);
  },
};

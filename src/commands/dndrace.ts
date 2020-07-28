import { commandInt } from "../interfaces/commandInt";
import fetch from "node-fetch";
import { MessageEmbed } from "discord.js";
import { dndraceInt } from "../interfaces/dndraceInt";

export const dndrace: commandInt = {
  prefix: "dndrace",
  description:
    "Gets information on a Dungeons and Dragons race. Use the format 'dndrace <race name>'",
  command: async (message) => {
    const query = message.content.split(" ").slice(1).join("-");
    if (!query) {
      message.channel.send("ERROR 400: No query provided.");
      return;
    }
    const race = await fetch("https://www.dnd5eapi.co/api/races/" + query);
    const data: dndraceInt = await race.json();
    if (!data || data.error) {
      message.channel.send("ERROR 404: Not found.");
      return;
    }
    const embed = new MessageEmbed()
      .setTitle(data.name)
      .setURL("https://www.dnd5eapi.co" + data.url)
      .addFields(
        { name: "Age", value: data.age },
        { name: "Alignment", value: data.alignment },
        { name: "Size", value: data.size_description },
        { name: "Language", value: data.language_desc },
        {
          name: "Bonuses",
          value: data.ability_bonuses
            .map((el) => el.name + ": " + el.bonus)
            .reduce((acc, el) => acc + ", " + el),
        }
      );
    message.channel.send(embed);
  },
};

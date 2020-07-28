import { commandInt } from "../interfaces/commandInt";
import fetch from "node-fetch";
import { MessageEmbed } from "discord.js";
import { dndspellInt } from "../interfaces/dndspellInt";

export const dndspell: commandInt = {
  prefix: "dndspell",
  description:
    "Gets information on a Dungeons and Dragons spell. Use the format 'dndmon <spell name>'",
  command: async (message) => {
    const query = message.content.split(" ").slice(1).join("-");
    console.log(query);
    if (!query) {
      message.channel.send("ERROR 400: No query provided.");
      return "failed";
    }
    const spell = await fetch("https://www.dnd5eapi.co/api/spells/" + query);
    const data: dndspellInt = await spell.json();
    if (!data) {
      message.channel.send("ERROR 404: Not found.");
      return;
    }
    const embed = new MessageEmbed()
      .setTitle(data.name)
      .setDescription(data.desc[0])
      .addFields(
        { name: "Higher Level Casting", value: data.higher_level },
        { name: "School", value: data.school.name },
        { name: "Material", value: data.material },
        {
          name: "Components",
          value: data.components.reduce((acc, el) => acc + ", " + el),
        },
        {
          name: "Casting Time",
          value: data.casting_time,
        },
        { name: "Range", value: data.range }
      );
    message.channel.send(embed);
    return "success";
  },
};

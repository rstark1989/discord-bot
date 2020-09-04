import { CommandInt } from "../interfaces/CommandInt";
import fetch from "node-fetch";
import { MessageEmbed } from "discord.js";
import { DndSpellInt } from "../interfaces/DndSpellInt";

export const dndSpell: CommandInt = {
  prefix: "dndspell",
  description:
    "Gets information on the provided Dungeons and Dragons **spell**",
  parameters: "`<spell>`: name of the spell to search",
  command: async (message) => {
    const query = message.content.split(" ").slice(1).join("-");
    console.log(query);
    if (!query) {
      message.channel.send("Sorry, but what did you want me to search for?");
      return;
    }
    const spell = await fetch("https://www.dnd5eapi.co/api/spells/" + query);
    const data: DndSpellInt = await spell.json();
    if (!data || data.error) {
      message.channel.send("Sorry, but I was not able to find anything...");
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
  },
};

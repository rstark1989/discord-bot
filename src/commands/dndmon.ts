import { commandInt } from "../interfaces/commandInt";
import fetch from "node-fetch";
import { MessageEmbed } from "discord.js";
import { dndmonInt } from "../interfaces/dndmonInt";

export const dndmon: commandInt = {
  prefix: "dndmon",
  description:
    "Gets information on a Dungeons and Dragons monster. Use the format 'dndmon <monster name>'",
  command: async (message) => {
    const query = message.content.split(" ").slice(1).join("-");
    console.log(query);
    if (!query) {
      message.channel.send("ERROR 400: No query provided.");
      return;
    }
    const monster = await fetch(
      "https://www.dnd5eapi.co/api/monsters/" + query
    );
    const data: dndmonInt = await monster.json();
    if (!data || data.error) {
      message.channel.send("ERROR 404: Not found.");
      return;
    }
    const embed = new MessageEmbed().setTitle(data.name).addFields(
      { name: "Challenge Rating", value: data.challenge_rating },
      { name: "Type", value: `${data.type} - ${data.subtype}` },
      { name: "Alignment", value: data.alignment },
      {
        name: "Attributes",
        value: `STR: ${data.strength} DEX: ${data.dexterity}, CON: ${data.constitution}, INT: ${data.intelligence}, WIS: ${data.wisdom}, CHA: ${data.charisma}`,
      },
      { name: "Armour Class", value: data.armor_class }
    );
    message.channel.send(embed);
  },
};

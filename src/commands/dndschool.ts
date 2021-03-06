import { CommandInt } from "../interfaces/CommandInt";
import fetch from "node-fetch";
import { MessageEmbed } from "discord.js";
import { DndSchoolInt } from "../interfaces/DndSchoolInt";

export const dndSchool: CommandInt = {
  prefix: "dndschool",
  description:
    "Gets information on the provided Dungeons and Dragons **school** of magic.",
  parameters: "`<school>`: name of the school of magic to search",
  command: async (message) => {
    const query = message.content.split(" ").slice(1).join("-");
    if (!query) {
      message.channel.send("Sorry, but what did you want me to search for?");
      return;
    }
    const school = await fetch(
      "https://www.dnd5eapi.co/api/magic-schools/" + query
    );
    const data: DndSchoolInt = await school.json();
    if (!data || data.error) {
      message.channel.send("Sorry, but I was not able to find anything...");
      return;
    }
    const embed = new MessageEmbed()
      .setTitle(data.name)
      .setDescription(data.desc)
      .setURL("https://www.dnd5eapi.co" + data.url);
    message.channel.send(embed);
  },
};

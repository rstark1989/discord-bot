import { commandInt } from "../interfaces/commandInt";
import { MessageEmbed } from "discord.js";

export const dnd: commandInt = {
  prefix: "dnd",
  description: "Lists the available dnd commands",
  command: (message) => {
    const dndEmbed = new MessageEmbed()
      .setTitle("Dungeons and Dragons!")
      .setDescription("Search complete. Displaying available commands!")
      .addFields({ name: "dndmon", value: "Gets information on a monster." });
    message.channel.send(dndEmbed);
    return "success";
  },
};

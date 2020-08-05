import { commandInt } from "../interfaces/commandInt";
import { MessageEmbed } from "discord.js";

export const dnd: commandInt = {
  prefix: "dnd",
  description: "Lists the available dnd commands",
  parameters: "*none*",
  command: (message) => {
    const dndEmbed = new MessageEmbed()
      .setTitle("Dungeons and Dragons!")
      .setDescription("Search complete. Displaying available commands!")
      .addFields(
        {
          name: "dndclass",
          value: "Get information on a Dungeons and Dragons class",
        },
        {
          name: "dndmon",
          value: "Get information on a Dungeons and Dragons monster",
        },
        {
          name: "dndrace",
          value: "Get information on a Dungeons and Dragons race",
        },
        {
          name: "dndschool",
          value: "Get information on a Dungeons and Dragons school of magic",
        },
        {
          name: "dndspell",
          value: "Get information on a Dungeons and Dragons spell",
        }
      );
    message.channel.send(dndEmbed);
    return "success";
  },
};

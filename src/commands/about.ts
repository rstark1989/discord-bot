import { MessageEmbed } from "discord.js";
import fs from "fs";
import { commandInt } from "../interfaces/commandInt";
import packageInfo from "../../package.json";

export const about: commandInt = {
  //prefix and description - prefix is necessary to trigger command, description is just for the record.
  prefix: "about",
  description: "Provides details about the bot.",
  command: async function (message) {
    const files = await fs.promises.readdir(__dirname);
    const aboutEmbed: MessageEmbed = new MessageEmbed()
      .setColor("#ab47e6")
      .setTitle("My name is nhbot!")
      .setDescription(
        "BEEP BOOP: I am a discord bot created by [nhcarrigan](https://www.nhcarrigan.com), with help from a few contributors.  You can view my [source code and contributor list](https://github.com/nhcarrigan/discord-bot) online."
      )
      .addFields(
        {
          name: "Version:",
          value: `${packageInfo.version}`,
        },
        {
          name: "Creation Date:",
          value: "Sun May 31 2020",
        },
        {
          name: "Known Commands:",
          value: `${files.length} 🙃`,
        },
        {
          name: "Favourite colour:",
          value: "PURPLE! 💜",
        }
      )
      .setFooter("BEEP BOOP: Message terminated.");
    if (message.content !== "test") message.channel.send(aboutEmbed);
    return packageInfo.version;
  },
};

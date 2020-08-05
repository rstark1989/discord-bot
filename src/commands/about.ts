import { MessageEmbed } from "discord.js";
import fs from "fs";
import { CommandInt } from "../interfaces/CommandInt";
import packageInfo from "../../package.json";

export const about: CommandInt = {
  prefix: "about",
  description: "Provides details about the bot.",
  parameters: "*none*",
  command: async (message) => {
    const files = await fs.promises.readdir("./src/commands");
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
    message.channel.send(aboutEmbed);
  },
};

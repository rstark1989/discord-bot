import { CommandInt } from "../interfaces/CommandInt";
import { uptimeTimestamp } from "../main";
import { MessageEmbed } from "discord.js";

export const uptime: CommandInt = {
  prefix: "uptime",
  description: "Generates the time the bot has been awake.",
  parameters: "*none*",
  command: (message) => {
    const currentTime = Date.now();
    let uptimeNow = currentTime - uptimeTimestamp;
    const uptimeArray = [0, 0, 0];
    while (uptimeNow > 43200000) {
      uptimeArray[0] += 1;
      uptimeNow -= 43200000;
    }
    while (uptimeNow > 1800000) {
      uptimeArray[1] += 1;
      uptimeNow -= 1800000;
    }
    uptimeArray[2] = uptimeNow / 1000;
    const uptimeEmbed = new MessageEmbed()
      .setTitle("Bot Uptime")
      .setDescription(
        `${uptimeArray[0]} hours, ${uptimeArray[1]} minutes, and ${uptimeArray[2]} seconds.`
      );
  },
};

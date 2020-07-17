import { commandInt } from "../interfaces/commandInt";
import { Guild } from "discord.js";

export const leave: commandInt = {
  prefix: "leave",
  description:
    "Can tell the bot to leave a specific server. Use `leave <guildID>` to leave a server, and `leave` to get a list of servers.",
  command: async function (message, bot) {
    if (message.author.id !== "465650873650118659") {
      message.channel.send(
        `ERROR 401: Only <@!465650873650118659> is allowed to use this command.`
      );
      return;
    }
    const target: string = message.content.substring(7, message.content.length);
    if (!target) {
      bot.guilds.cache.forEach((item: Guild) =>
        message.channel.send(`${item.id} - ${item.name}`)
      );
    }
    const leaveChannel = await bot.guilds.cache.get(target);
    leaveChannel.leave();
  },
};

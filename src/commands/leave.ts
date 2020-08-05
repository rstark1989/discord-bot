import { CommandInt } from "../interfaces/CommandInt";
import { Guild } from "discord.js";

export const leave: CommandInt = {
  prefix: "leave",
  description:
    "Can tell the bot to leave a specific server. Use `leave <guildID>` to leave a server, and `leave` to get a list of servers. This command is specific to the bot owner <@!465650873650118659>.",
  parameters: "*none*",
  command: async (message, bot) => {
    if (message.author.id !== "465650873650118659") {
      message.channel.send(
        `ERROR 401: Only <@!465650873650118659> is allowed to use this command.`
      );
      return;
    }
    const target: string = message.content.substring(7, message.content.length);
    if (!target) {
      bot?.guilds.cache.forEach((item: Guild) =>
        message.channel.send(`${item.id} - ${item.name}`)
      );
    }
    const leaveChannel = bot?.guilds.cache.get(target);
    leaveChannel?.leave();
  },
};

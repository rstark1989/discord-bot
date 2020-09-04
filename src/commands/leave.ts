import { CommandInt } from "../interfaces/CommandInt";
import { Guild } from "discord.js";

export const leave: CommandInt = {
  prefix: "leave",
  description:
    "Can tell the bot to leave a specific server. Gives a list of servers the bot is in. Pass the ID of the target server as the parameter to leave that server. This command is specific to the bot owner <@!465650873650118659>.",
  parameters: "<serverID>: the ID of the server to leave",
  command: async (message, bot) => {
    if (message.author.id !== "465650873650118659") {
      message.channel.send(
        "Sorry, but only <@!465650873650118659> is allowed to use this command."
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

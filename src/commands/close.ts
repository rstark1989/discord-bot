import config from "../../config.json";
import { CommandInt } from "../interfaces/CommandInt";
import { TextChannel, MessageEmbed } from "discord.js";
export const close: CommandInt = {
  prefix: "close",
  description:
    "Closes the channel - only available for automatically generated appeal channels. Only available to moderators.",
  parameters: "*none*",
  command: async (message) => {
    const target = message.channel as TextChannel;
    //check for log channel
    const log = message.guild?.channels.cache.find(
      (channel) => channel.name === config.log_channel
    ) as TextChannel;
    //check for user permissions
    if (!message.member?.hasPermission("MANAGE_CHANNELS")) {
      message.channel.send("ERROR 401: Missing permissions.");
      return;
    }
    if (!log) {
      message.channel.send("ERROR 404: Log channel not found.");
      return;
    }
    if (!target.name.includes("suspended")) {
      message.channel.send("ERROR 401: Channel cannot be deleted.");
      return;
    }
    target.delete().catch((e) => console.error(e));
    const deleteEmbed = new MessageEmbed()
      .setTitle("Channel Deleted")
      .setDescription(
        `<@!${message.author}> has closed and deleted the \`${target.name}\` channel`
      );
    log.send(deleteEmbed);
  },
};

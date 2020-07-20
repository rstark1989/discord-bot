import config from "../../config.json";
import { commandInt } from "../interfaces/commandInt";
import { TextChannel, MessageEmbed } from "discord.js";
export const close: commandInt = {
  prefix: "close",
  description: "Closes the channel.",
  command: async function (message) {
    const target = message.channel as TextChannel;
    //check for log channel
    const log = message.guild?.channels.cache.find(
      (channel) => channel.name === config.log_channel
    ) as TextChannel;
    //check for user permissions
    if (!message.member?.hasPermission("MANAGE_CHANNELS")) {
      message.channel.send(`ERROR 401: Missing permissions.`);
      return "failed";
    }
    if (!log) {
      message.channel.send(`ERROR 404: Log channel not found.`);
      return "failed";
    }
    if (!target.name.includes("suspended")) {
      message.channel.send(`ERROR 401: Channel cannot be deleted.`);
      return "failed";
    }
    target.delete().catch((e) => console.error(e));
    const deleteEmbed = new MessageEmbed()
      .setTitle("Channel Deleted")
      .setDescription(
        `<@!${message.author}> has closed and deleted the \`${target.name}\` channel`
      );
    log.send(deleteEmbed);
    return "success";
  },
};

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
      message.channel.send(
        "Sorry, but this command is restricted to administrators."
      );
      return;
    }
    if (!log) {
      message.channel.send(
        "Sorry, but I could not find where you wanted the logs."
      );
      return;
    }
    if (!target.name.includes("suspended")) {
      message.channel.send(
        "Sorry, but I am only allowed to close the `suspended-user` channels."
      );
      return;
    }
    target.delete().catch((e) => console.error(e));
    const deleteEmbed = new MessageEmbed()
      .setTitle("Channel Deleted")
      .setDescription(
        `<@!${message.author}> has closed and deleted the \`${target.name}\` channel`
      )
      .setFooter(`The channel ID was ${target.id}`);
    log.send(deleteEmbed);
  },
};

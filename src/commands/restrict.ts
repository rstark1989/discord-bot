import config from "../../config.json";
import { CommandInt } from "../interfaces/CommandInt";
import { TextChannel, MessageEmbed } from "discord.js";

export const restrict: CommandInt = {
  prefix: "restrict",
  description:
    "Restrict **user**'s access to the channel. Optionally provide a **reason**. Only available to server moderators. Bot will log this action if log channel is available.",
  parameters:
    "`<user>`: @name of the user to restrict | `<?reason>`: reason for restricting the user.",
  command: async (message) => {
    if (!message.member?.hasPermission("KICK_MEMBERS")) {
      message.channel.send(`ERROR 401: Missing permissions.`);
      return;
    }
    const modChannel = message.guild?.channels.cache.find(
      (channel) => channel.name === config.log_channel
    ) as TextChannel;
    if (!modChannel) {
      message.channel.send(`ERROR 404: Log channel not found.`);
      return;
    }
    const suspendCategory = config.silence_category;
    const category = message.guild?.channels.cache.find(
      (c) => c.name === suspendCategory && c.type === "category"
    );
    if (!category) {
      message.channel.send(`ERROR 404: Missing suspend category.`);
      return;
    }
    const suspend = message.guild?.roles.cache.find(
      (role) => role.name == config.silence_role
    );
    if (!suspend) {
      message.channel.send(`ERROR 404: Missing suspend role.`);
      return;
    }
    const mod = message.author;
    const msgArguments = message.content.split(" ");
    const member = message.mentions.members?.first();
    if (!member) {
      message.channel.send(`ERROR 404: Invalid user tag.`);
      return;
    }
    if (message.mentions.users.first() === mod) {
      message.channel.send(`ERROR 400: Cannot target self.`);
      return;
    }
    const reasonArg = msgArguments.slice(2, msgArguments.length);
    let reason = reasonArg.join(" ");
    if (reason == "") {
      reason = "ERROR 404: No reason provided.";
    }
    const restrictEmbed = new MessageEmbed()
      .setColor("#FF0000")
      .setTitle(`Access Restricted!`)
      .addFields(
        {
          name: "Event:",
          value: `<@!${mod}> has suspended <@!${member}>.`,
        },
        {
          name: "Reason:",
          value: `${reason}`,
        }
      )
      .setFooter("BEEP BOOP: Please remember to follow our rules!");
    modChannel.send(restrictEmbed);
    member.roles.set([suspend]);
    const channelName = `suspended-${member.user.username}`;
    message.guild?.channels.create(channelName, {
      type: "text",
      permissionOverwrites: [
        {
          id: member.id,
          allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"],
        },
        {
          id: message.guild?.id,
          deny: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"],
        },
      ],
      parent: category,
    });
    member.send(
      `BEEP BOOP: Suspension protocol initiated for: ${reason} - Appeal channel creation complete.`
    );
  },
};

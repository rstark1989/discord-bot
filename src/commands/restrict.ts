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
      message.channel.send(
        "Sorry, but this command is restricted to moderators."
      );
      return;
    }
    const modChannel = message.guild?.channels.cache.find(
      (channel) => channel.name === config.log_channel
    ) as TextChannel;
    if (!modChannel) {
      message.channel.send("Sorry, but I could not where you wanted the logs.");
      return;
    }
    const suspendCategory = config.silence_category;
    const category = message.guild?.channels.cache.find(
      (c) => c.name === suspendCategory && c.type === "category"
    );
    if (!category) {
      message.channel.send(
        "Sorry, but I could not find the restricted category."
      );
      return;
    }
    const suspend = message.guild?.roles.cache.find(
      (role) => role.name === config.silence_role
    );
    if (!suspend) {
      message.channel.send("Sorry, but I could not find the restricted role.");
      return;
    }
    const botRole = message.guild?.roles.cache.find(
      (role) => role.name === config.bot_role
    );
    if (!botRole) {
      message.channel.send("Sorry, but I could not find my bot role.");
      return;
    }
    const modRole = message.guild?.roles.cache.find(
      (role) => role.name === config.mod_role
    );
    if (!modRole) {
      message.channel.send("Sorry, but I could not find the moderator role.");
      return;
    }
    const mod = message.author;
    const msgArguments = message.content.split(" ");
    const member = message.mentions.members?.first();
    const bot = config.bot_id;
    if (member?.id === bot) {
      message.channel.send("Why do you want to restrict me? I am sad now.");
      return;
    }
    if (!member) {
      message.channel.send(
        "Sorry, but that appears to be an invalid user mention."
      );
      return;
    }
    if (message.mentions.users.first() === mod) {
      message.channel.send("Sorry, but you cannot restrict yourself!");
      return;
    }
    const reasonArg = msgArguments.slice(2, msgArguments.length);
    let reason = reasonArg.join(" ");
    if (!reason) {
      reason = "Sorry, but the moderator did not provide a reason.";
    }
    const restrictEmbed = new MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Access Restricted!")
      .addFields(
        {
          name: "Event:",
          value: `<@!${mod}> has restricted <@!${member}>.`,
        },
        {
          name: "Reason:",
          value: `${reason}`,
        }
      )
      .setFooter("Please remember to follow our rules!");
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
        {
          id: modRole,
          allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"],
        },
        {
          id: botRole,
          allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"],
        },
      ],
      parent: category,
    });
    member.send(
      `Hello! Sorry to bother you. It appears you have been suspended from ${message.guild?.name} for: ${reason} - I have created a channel there for you to appeal this decision.`
    );
  },
};

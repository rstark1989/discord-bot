import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";

export const server: CommandInt = {
  prefix: "server",
  description: "Gives the current status of this server.",
  parameters: "*none*",
  command: (message) => {
    const joined = new Date(
      message.member?.joinedTimestamp || Date.now()
    ).toDateString();
    const created = new Date(
      message.guild?.createdTimestamp || Date.now()
    ).toDateString();
    const onlineStats = `🟢 ${
      message.guild?.members.cache.filter(
        (el) => el.user.presence.status === "online"
      ).size
    } | 🟡 ${
      message.guild?.members.cache.filter(
        (el) => el.user.presence.status === "idle"
      ).size
    } | 🔴 ${
      message.guild?.members.cache.filter(
        (el) => el.user.presence.status === "dnd"
      ).size
    } | ⚪ ${
      message.guild?.members.cache.filter(
        (el) => el.user.presence.status === "offline"
      ).size
    }`;
    const statusEmbed = new MessageEmbed()
      .setColor("#0099FF")
      .setTitle(`${message.guild?.name}`)
      .setDescription("BEEP BOOP: Initiating server record search.")
      .setImage(
        `https://cdn.discordapp.com/icons/${message.guild?.id}/${message.guild?.icon}.png`
      )
      .addFields(
        {
          name: "Server Creation Date:",
          value: `${created}`,
          inline: true,
        },
        {
          name: "Your Server Join Date:",
          value: `${joined}`,
          inline: true,
        },
        {
          name: "Server Owner:",
          value: `<@!${message.guild?.owner}>`,
          inline: true,
        },
        {
          name: "Member Count:",
          value: `${message.guild?.memberCount}`,
          inline: true,
        },
        {
          name: "Human Members:",
          value: `${
            message.guild?.members.cache.filter((el) => !el.user.bot).size
          }`,
          inline: true,
        },
        {
          name: "Bot Members:",
          value: `${
            message.guild?.members.cache.filter((el) => el.user.bot).size
          }`,
          inline: true,
        },
        {
          name: "Banned users:",
          value: `${message.guild?.fetchBans.length}`,
          inline: true,
        },
        { name: "Member Status Tracking:", value: onlineStats, inline: true },
        {
          name: "Role Count:",
          value: message.guild?.roles.cache.size,
          inline: true,
        },
        {
          name: "Role Names:",
          value: message.guild?.roles.cache.map((el) => el.name).join(" | "),
        },
        {
          name: "Channel Count:",
          value: message.guild?.channels.cache.size,
          inline: true,
        },
        {
          name: "Number of Text Channels:",
          value: `${
            message.guild?.channels.cache.filter((el) => el.type === "text")
              .size
          }`,
          inline: true,
        },
        {
          name: "Number of Voice Channels:",
          value: `${
            message.guild?.channels.cache.filter((el) => el.type === "voice")
              .size
          }`,
          inline: true,
        }
      )
      .setFooter("BEEP BOOP: Search complete.");
    message.channel.send(statusEmbed);
  },
};

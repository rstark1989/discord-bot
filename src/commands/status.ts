import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";

export const status: CommandInt = {
  prefix: "status",
  description: "Gives the current status of this server.",
  parameters: "*none*",
  command: (message) => {
    const joined = new Date(
      message.member?.joinedTimestamp || Date.now()
    ).toDateString();
    const created = new Date(
      message.guild?.createdTimestamp || Date.now()
    ).toDateString();
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
        },
        {
          name: "Your Server Join Date:",
          value: `${joined}`,
        },
        {
          name: "Server Owner:",
          value: `<@!${message.guild?.owner}>`,
        },
        {
          name: "Member Count:",
          value: `${message.guild?.memberCount}`,
        }
      )
      .setFooter("BEEP BOOP: Search complete.");
    message.channel.send(statusEmbed);
  },
};

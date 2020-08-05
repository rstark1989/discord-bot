import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";

export const user: CommandInt = {
  prefix: "user",
  description: "Returns information on the **user**.",
  parameters: "`<user>`: @name of the user to get information about",
  command: (message) => {
    const user = message.mentions.users.first();
    const member = message.mentions.members?.first();
    if (!user || !member) {
      message.channel.send("ERROR 404: record not found or invalid user tag.");
      return;
    }
    const joined = new Date(
      member.joinedTimestamp || Date.now()
    ).toDateString();
    const created = new Date(user.createdTimestamp).toDateString();
    const userEmbed = new MessageEmbed()
      .setTitle(member.displayName)
      .setDescription(`BEEP BOOP: Initiating record search for <@!${user}>!`)
      .addFields(
        {
          name: "Creation Date:",
          value: `User account created on ${created}`,
        },
        {
          name: "Username:",
          value: `Full username is ${user.tag}`,
        },
        {
          name: "Status",
          value: `Current status is ${user.presence.status}`,
        },
        {
          name: "Server Join Date",
          value: `The user joined this server on ${joined}`,
        },
        {
          name: "Roles",
          value: `The user has these roles for the server: ${member.roles.cache
            .map((role) => role.name)
            .join(", ")}`,
        }
      )
      .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`)
      .setFooter("BEEP BOOP: Search complete.");
    message.channel.send(userEmbed);
  },
};

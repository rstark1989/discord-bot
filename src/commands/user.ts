import { CommandInt } from "../interfaces/CommandInt";
import {
  MessageEmbed,
  MessageCollector,
  TextChannel,
  Message,
} from "discord.js";

export const user: CommandInt = {
  prefix: "user",
  description: "Returns information on your account.",
  parameters: "*none*",
  command: (message) => {
    const user = message.author;
    const memberGuild = message.author.client.guilds.cache.find(
      (guild) => guild.id === message.guild?.id
    );
    const member = memberGuild?.members.cache.find(
      (mem) => mem.id === message.author.id
    );
    const joined = new Date(
      member?.joinedTimestamp || Date.now()
    ).toDateString();
    const created = new Date(user.createdTimestamp).toDateString();
    const userEmbed = new MessageEmbed()
      .setTitle(member?.displayName)
      .setDescription(`This is the information I could find on <@!${user}>!`)
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
          value: `The user has these roles for the server: ${member?.roles.cache
            .map((role) => role.name)
            .join(", ")}`,
        }
      )
      .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`);
    message.channel.send(
      "Wait! I need to make sure you are okay with this. This command will display some of your user information, like your username and account creation date. If you are okay with this, say 'Yes'."
    );
    const collector: MessageCollector = new MessageCollector(
      message.channel as TextChannel,
      (m: Message) => m.author === message.author,
      { time: 10000 }
    );
    collector.on("collect", (reply) => {
      if (reply.content === "Yes") {
        message.channel.send(userEmbed);
        return;
      }
      message.channel.send("Okay, I will hold off on this action for now.");
    });
  },
};

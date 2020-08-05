import config from "../../config.json";
import { CommandInt } from "../interfaces/CommandInt";
import { TextChannel, MessageEmbed } from "discord.js";

export const kick: CommandInt = {
  prefix: "kick",
  description:
    "Kick **user** from the channel. Optionally provide a **reason**. Only available to server moderators. Bot will log this action if the log channel is available.",
  parameters:
    "`<user>`: @name of the user to kick | `<?reason>`: reason for kicking the user",
  command: (message) => {
    if (message.member?.hasPermission("KICK_MEMBERS") == false) {
      message.channel.send("ERROR 401: Missing permissions.");
      return;
    }
    const mod = message.author;
    const cmdArguments = message.content.split(" ");
    const member = message.mentions.members?.first();
    const user = message.mentions.users.first();
    if (member == undefined) {
      message.channel.send("ERROR 404: Invalid user tag.");
      return;
    }
    if (user == mod) {
      message.channel.send("ERROR 400: Cannot target self.");
      return;
    }
    const reasonArg = cmdArguments.slice(2, cmdArguments.length);
    let reason = reasonArg.join(" ");
    if (reason == "") {
      reason = "ERROR 404: No reason provided";
    }
    const kickEmbed = new MessageEmbed()
      .setColor("#ff8400")
      .setTitle("Kicked!")
      .addFields(
        {
          name: "Event:",
          value: `<@!${mod}> has kicked <@!${user}> from the server.`,
        },
        {
          name: "Reason:",
          value: `${reason}`,
        }
      )
      .setFooter("BEEP BOOP: Please remember to follow our rules!");
    const modChannel = message.guild?.channels.cache.find(
      (channel) => channel.name === config.log_channel
    ) as TextChannel;
    if (modChannel) {
      modChannel.send(kickEmbed);
    }
    if (!modChannel) {
      message.channel.send("ERROR 404: log channel not found.");
    }
    member.kick().catch((err: Error) => console.log(err));
  },
};

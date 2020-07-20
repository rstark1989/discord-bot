import config from "../../config.json";
import { commandInt } from "../interfaces/commandInt";
import { TextChannel, MessageEmbed } from "discord.js";

export const kick: commandInt = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "kick",
  description:
    "Kicks the mentioned user for the mentioned reason. Use the format 'kick <user> <reason>'. Only available to server moderators.",
  command: function (message) {
    //check for required permission
    if (message.member?.hasPermission("KICK_MEMBERS") == false) {
      message.channel.send(`ERROR 401: Missing permissions.`);
      return "failed";
    }
    const mod = message.author;
    const cmdarguments = message.content.split(" ");
    const user = message.mentions.members?.first();
    const usernotmember = message.mentions.users.first();

    //check for valid user mention
    if (user == undefined) {
      message.channel.send(`ERROR 404: Invalid user tag.`);
      return "failed";
    }
    //cannot target self
    if (usernotmember == mod) {
      message.channel.send(`ERROR 400: Cannot target self.`);
      return "failed";
    }
    const reasonArg = cmdarguments.slice(2, cmdarguments.length);
    let reason = reasonArg.join(" ");
    //check for reason provided, if none then create reason.
    if (reason == "") {
      reason = "ERROR 404: No reason provided";
    }
    const kickEmbed = new MessageEmbed()
      .setColor("#ff8400")
      .setTitle(`Kicked!`)
      .addFields(
        {
          name: "Event:",
          value: `<@!${mod}> has kicked <@!${usernotmember}> from the server.`,
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
    user.kick().catch((err: Error) => console.log(err));
    return "success";
  },
};

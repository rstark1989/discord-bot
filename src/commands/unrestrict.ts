import config from "../../config.json";
import { commandInt } from "../interfaces/commandInt";
import { MessageEmbed, TextChannel } from "discord.js";
export const unrestrict: commandInt = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "unrestrict",
  description:
    "Restore a user's permissions. Use the format 'unrestrict <user> <reason>'. Only available to server moderators.",
  command: function (message) {
    //check for appropriate permissions
    if (message.member?.hasPermission("KICK_MEMBERS") == false) {
      message.channel.send(`ERROR 401: Missing permissions.`);
      return "failed";
    }
    const mod = message.author;
    const cmdarguments = message.content.split(" ");
    const user = message.mentions.members?.first();
    const usernotmember = message.mentions.users.first();
    //check for valid user tag
    if (user == undefined) {
      message.channel.send(`ERROR 400: Invalid user tag.`);
      return "failed";
    }
    //cannot target self
    if (usernotmember == mod) {
      message.channel.send(`ERROR 400: Cannot target self.`);
      return "failed";
    }
    const reasonArg = cmdarguments.slice(2, cmdarguments.length);
    let reason = reasonArg.join(" ");
    //check for reason provided, if none then create one.
    if (reason == "") {
      reason = "ERROR 404: No reason provided.";
    }
    const suspend = message.guild?.roles.cache.find(
      (role) => role.name == config.silence_role
    );
    // check for valid role. Change role.name to match your server.
    if (!suspend) {
      message.channel.send(`ERROR 304: Missing "Restricted" role.`);
      return "failed";
    }
    const unrestrictEmbed = new MessageEmbed()
      .setColor("#00FF00")
      .setTitle(`Access Restored`)
      .addFields(
        {
          name: "Event:",
          value: `<@!${mod}> has restored <@!${user}>'s access to the server.`,
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
      modChannel.send(unrestrictEmbed);
    }
    if (!modChannel) {
      message.channel.send("ERROR 404: missing log channel");
    }
    user.roles.remove(suspend).catch((e) => console.log(e));
    return "success";
  },
};

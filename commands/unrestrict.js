const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "unrestrict",
  description:
    "Restore a user's permissions. Use the format 'unrestrict <user> <reason>'. Only available to server moderators.",
  command: function(message) {
    //check for appropriate permissions
    if (message.member.hasPermission("KICK_MEMBERS") == false) {
      message.channel.send(
        `ERROR 401: ${message.author}, missing permissions.`
      );
      return;
    }
    const mod = message.author;
    const arguments = message.content.split(" ");
    const user = message.mentions.members.first();
    //check for valid user tag
    if (user == undefined) {
      message.channel.send(`ERROR 400: ${mod}, invalid user tag.`);
      return;
    }
    //cannot target self
    if (user == mod) {
      message.channel.send(`ERROR 400: ${mod},cannot target self.`);
      return;
    }
    const reasonArg = arguments.slice(2, arguments.length);
    let reason = reasonArg.join(" ");
    //check for reason provided, if none then create one.
    if (reason == "") {
      reason = "ERROR 404: No reason provided.";
    }
    const suspend = message.guild.roles.cache.find(
      role => role.name == config.silence_role
    );
    // check for valid role. Change role.name to match your server.
    if (!suspend) {
      message.channel.send(`ERROR 304: ${mod}, missing "Restricted" role.`);
      return;
    }
    const unrestrictEmbed = new Discord.MessageEmbed()
      .setColor("#00FF00")
      .setTitle(`Access Restored`)
      .addFields(
        {
          name: "What happened?",
          value: `${mod} has restored ${user}'s access to the server.`
        },
        {
          name: "Reason",
          value: `${reason}`
        }
      )
      .setFooter("Please remember to follow our rules!");
    const modChannel = message.guild.channels.cache.find(
      channel => channel.name === config.log_channel
    );
    if (modChannel) {
      modChannel.send(unrestrictEmbed);
    }
    if (!modChannel) {
      message.channel.send("ERROR 404: missing log channel");
    }
    user.roles.remove(suspend).catch(e => console.log(e));
  }
};

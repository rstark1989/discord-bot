const Discord = require("discord.js");

module.exports = {
  prefix: "unrestrict",
  description:
    "Restore a user's permissions. Use the format 'unrestrict <user> <reason>'. Only available to server moderators.",
  command: function(message) {
    if (message.member.hasPermission("KICK_MEMBERS") == false) {
      message.channel.send(
        `I apologise, ${message.author}, but you do not have the correct permissions to use this command.`
      );
      return;
    }
    const mod = message.author;
    const arguments = message.content.split(" ");
    const user = message.mentions.members.first();
    if (user == undefined) {
      message.channel.send(
        `I apologise, ${mod}, but that appears to be an invalid user tag. Please try again.`
      );
      return;
    }
    const reasonArg = arguments.slice(2, arguments.length);
    let reason = reasonArg.join(" ");
    if (reason == "") {
      reason = "No reason provided.";
    }
    const suspend = message.guild.roles.cache.find(
      role => role.name == "Restricted"
    );
    const unrestrictEmbed = new Discord.MessageEmbed()
      .setColor("#0099FF")
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
    message.guild.channels.cache
      .find(channel => channel.name === "moderation-activity")
      .send(unrestrictEmbed);
    user.roles.remove(suspend).catch(e => console.log(e));
  }
};

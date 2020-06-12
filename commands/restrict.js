const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description ensures it shows in |help.
  prefix: "restrict",
  description:
    "Restrict a user's permissions. Use the format 'restrict <user> <reason>'. Only available to server moderators.",
  command: function(message) {
    //check for appropriate permissions
    if (message.member.hasPermission("KICK_MEMBERS") == false) {
      message.channel.send(
        `I apologise, ${message.author}, but you do not have the correct permissions to use this command.`
      );
      return;
    }
    const mod = message.author;
    const arguments = message.content.split(" ");
    const user = message.mentions.members.first();
    //check for valid user tag
    if (user == undefined) {
      message.channel.send(
        `I apologise, ${mod}, but that appears to be an invalid user tag. Please try again.`
      );
      return;
    }
    //cannot target self
    if (user == mod) {
      message.channel.send(
        `Wait, ${mod}, you cannot punish yourself! Shall I find you some assistance?`
      );
      return;
    }
    const reasonArg = arguments.slice(2, arguments.length);
    let reason = reasonArg.join(" ");
    //check for reason provided, if none then create one.
    if (reason == "") {
      reason = "No reason provided.";
    }
    //check for valid role. Change "Restricted" to match the role your server has.
    const suspend = message.guild.roles.cache.find(
      role => role.name == config.silence_role
    );
    if (!suspend) {
      message.channel.send(
        `I apologise, ${mod}, but it seems the server does not have a "Restricted" role for me to assign.`
      );
      return;
    }
    const restrictEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle(`Access Restricted!`)
      .addFields(
        {
          name: "What happened?",
          value: `${mod} has restricted ${user}'s access to the server.`
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
      modChannel.send(restrictEmbed);
    }
    if (!modChannel) {
      message.channel.send("I could not find your log channel. :(");
    }
    user.roles.remove(user.roles).catch(e => console.log(e));
    user.roles.add(suspend).catch(e => console.log(e));
  }
};

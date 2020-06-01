const Discord = require("discord.js");

module.exports = {
  prefix: "warn",
  description:
    "Send a warning to a user. Use the format 'warn <user> <reason>'. Only available to server moderators.",
  command: function(message) {
    if (message.member.hasPermission("KICK_MEMBERS") == false) {
      message.channel.send(
        `I apologise, ${message.author}, but you do not have the correct permissions to use this command.`
      );
      return;
    }
    const mod = message.author;
    const arguments = message.content.split(" ");
    const user = message.mentions.users.first();
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
    const warnEmbed = new Discord.MessageEmbed()
      .setColor("#0099FF")
      .setTitle(`This is a warning!`)
      .addFields(
        {
          name: "What happened?",
          value: `${mod} has issued a warning to you.`
        },
        {
          name: "Reason",
          value: `${reason}`
        }
      )
      .setFooter("You can read the rules in the Welcome channel!");
    user.send(warnEmbed);
    message.guild.channels.cache
      .find(channel => channel.name === "moderation-activity")
      .send(`${mod} has issued a warning to ${user}: ${reason}`);
  }
};

const Discord = require("discord.js");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description ensures it shows in |help.
  prefix: "warn",
  description:
    "Send a warning to a user. Use the format 'warn <user> <reason>'. Only available to server moderators.",
  command: function(message) {
    //check for appropriate permission
    if (message.member.hasPermission("KICK_MEMBERS") == false) {
      message.channel.send(
        `I apologise, ${message.author}, but you do not have the correct permissions to use this command.`
      );
      return;
    }
    const mod = message.author;
    const arguments = message.content.split(" ");
    const user = message.mentions.users.first();
    //check for valid user tag.
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
    const warnEmbed = new Discord.MessageEmbed()
      .setColor("#ffff00")
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
    const modChannel = message.guild.channels.cache.find(
      channel => channel.name === "moderation-activity"
    );
    if (modChannel) {
      modChannel.send(`${mod} has issued a warning to ${user}: ${reason}`);
    }
    if (!modChannel) {
      message.channel.send(
        "I could not find a 'moderation-activity' channel. :("
      );
    }
  }
};

const Discord = require("discord.js");

module.exports = {
  prefix: "warn",
  description: "Send a warning to a user. Only available to server moderators.",
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
    const reasonArg = arguments.slice(2, arguments.length);
    const reason = reasonArg.join(" ");
    const warnEmbed = new Discord.MessageEmbed()
      .setColor("#0099FF")
      .setTitle(`Kicked!`)
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

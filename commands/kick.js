const Discord = require("discord.js");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description ensures it shows in |help.
  prefix: "kick",
  description:
    "Kicks the mentioned user for the mentioned reason. Use the format 'kick <user> <reason>'. Only available to server moderators.",
  command: function(message) {
    //check for required permission
    if (message.member.hasPermission("KICK_MEMBERS") == false) {
      message.channel.send(
        `I apologise, ${message.author}, but you do not have the correct permissions to use this command.`
      );
      return;
    }
    const mod = message.author;
    const arguments = message.content.split(" ");
    const user = message.mentions.members.first();
    //check for valid user mention
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
    //check for reason provided, if none then create reason.
    if (reason == "") {
      reason = "No reason provided";
    }
    const kickEmbed = new Discord.MessageEmbed()
      .setColor("#0099FF")
      .setTitle(`Kicked!`)
      .addFields(
        {
          name: "What happened?",
          value: `${mod} has kicked ${user} from the server.`
        },
        {
          name: "Reason",
          value: `${reason}`
        }
      )
      .setFooter("Please remember to follow our rules!");
    const modChannel = message.guild.channels.cache.find(
      channel => channel.name === "moderation-activity"
    );
    if (modChannel) {
      modChannel.send(kickEmbed);
    }
    user.kick().catch(err => console.log(err));
  }
};

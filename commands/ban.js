const Discord = require("discord.js");

module.exports = {
  prefix: "ban",
  description:
    "Ban a user from the channel. Use the format 'ban <user> <reason>'. Only available to server moderators.",
  command: function(message) {
    if (message.member.hasPermission("BAN_MEMBERS") == false) {
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
      reason = "No reason provided";
    }
    const banEmbed = new Discord.MessageEmbed()
      .setColor("#0099FF")
      .setTitle(`Banned!`)
      .addFields(
        {
          name: "What happened?",
          value: `${mod} has banned ${user} from the server.`
        },
        {
          name: "Reason",
          value: `${reason}`
        }
      )
      .setFooter("You will still be missed... :(");
    message.channel.send(
      "Terribly sorry, but this action is irreversible so I need to ensure you really want to do this. To proceed, reply with 'Yes'."
    );
    const collector = new Discord.MessageCollector(
      message.channel,
      m => m.author == message.author,
      { time: 10000 }
    );
    collector.on("collect", reply => {
      if (reply.content == "Yes") {
        message.guild.channels.cache
          .find(channel => channel.name === "moderation-activity")
          .send(banEmbed);
        user.ban({ reason: reason }).catch(err => console.log(err));
      } else {
        message.channel.send("Very well, I shall hold off for now.");
      }
    });
  }
};

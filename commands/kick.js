const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "kick",
  description:
    "Kicks the mentioned user for the mentioned reason. Use the format 'kick <user> <reason>'. Only available to server moderators.",
  command: function(message) {
    //check for required permission
    if (message.member.hasPermission("KICK_MEMBERS") == false) {
      message.channel.send(
        `ERROR 401: ${message.author}, missing permissions.`
      );
      return;
    }
    const mod = message.author;
    const arguments = message.content.split(" ");
    const user = message.mentions.members.first();
    //check for valid user mention
    if (user == undefined) {
      message.channel.send(`ERROR 404: ${mod}, invalid user tag.`);
      return;
    }
    //cannot target self
    if (user == mod) {
      message.channel.send(`ERROR 400: ${mod}, cannot target self.`);
      return;
    }
    const reasonArg = arguments.slice(2, arguments.length);
    let reason = reasonArg.join(" ");
    //check for reason provided, if none then create reason.
    if (reason == "") {
      reason = "ERROR 404: No reason provided";
    }
    const kickEmbed = new Discord.MessageEmbed()
      .setColor("#ff8400")
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
      channel => channel.name === config.log_channel
    );
    if (modChannel) {
      modChannel.send(kickEmbed);
    }
    if (!modChannel) {
      message.channel.send("ERROR 404: log channel not found.");
    }
    user.kick().catch(err => console.log(err));
  }
};

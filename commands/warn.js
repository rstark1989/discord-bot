const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "warn",
  description:
    "Send a warning to a user. Use the format 'warn <user> <reason>'. Only available to server moderators.",
  command: function(message) {
    //check for appropriate permission
    if (message.member.hasPermission("KICK_MEMBERS") == false) {
      message.channel.send(
        `ERROR 401: ${message.author}, missing permissions.`
      );
      return;
    }
    const mod = message.author;
    const arguments = message.content.split(" ");
    const user = message.mentions.users.first();
    
    //check for valid user tag.
    if (user == undefined) {
      message.channel.send(`ERROR 400: ${mod}, invalid user tag.`);
      return;
    }
    //cannot target self
    if (user == mod) {
      message.channel.send(`ERROR 400: ${mod}, cannot target self.`);
      return;
    }
    const reasonArg = arguments.slice(2, arguments.length);
    let reason = reasonArg.join(" ");
    //check for reason provided, if none then create one.
    if (reason == "") {
      reason = "ERROR 404: No reason provided.";
    }
    const warnEmbed = new Discord.MessageEmbed()
      .setColor("#ffff00")
      .setTitle(`This is a warning!`)
      .addFields(
        {
          name: "Event:",
          value: `${mod} has issued a warning to you.`
        },
        {
          name: "Reason:",
          value: `${reason}`
        }
      )
      .setFooter("BEEP BOOP: You can read the rules in the Welcome channel!");
    user.send(warnEmbed).catch(err => console.log(err));
    const modChannel = message.guild.channels.cache.find(
      channel => channel.name === config.log_channel
    );
    const warnLogEmbed = new Discord.MessageEmbed()
      .setTitle("Warning!")
      .setDescription(`${mod} has issued a warning to ${user}!`)
      .addFields({
        name: "Reason",
        value: `${reason}`
      });
    if (modChannel) {
      modChannel.send(warnLogEmbed);
    }
    if (!modChannel) {
      message.channel.send("ERROR 400: missing log channel.");
    }
  }
};

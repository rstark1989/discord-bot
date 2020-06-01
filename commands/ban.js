const Discord = require("discord.js");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description ensures it shows in |help.
  prefix: "ban",
  description:
    "Ban a user from the channel. Use the format 'ban <user> <reason>'. Only available to server moderators.",
  command: function(message) {
    //check for appropriate permission.
    if (message.member.hasPermission("BAN_MEMBERS") == false) {
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
    if (user == mod) {
      message.channel.send(
        `Wait, ${mod}, you cannot punish yourself! Shall I find you some assistance?`
      );
      return;
    }
    const reasonArg = arguments.slice(2, arguments.length);
    let reason = reasonArg.join(" ");
    //check for reason provided.
    if (reason == "") {
      reason = "No reason provided";
    }
    const banEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
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
    //confirm you want to do this, as the bot currently cannot revert a ban.
    message.channel.send(
      "Terribly sorry, but this action is irreversible so I need to ensure you really want to do this. To proceed, reply with 'Yes'."
    );
    //listen for reply.
    const collector = new Discord.MessageCollector(
      message.channel,
      m => m.author == message.author,
      { time: 10000 }
    );
    collector.on("collect", reply => {
      //yes.
      if (reply.content == "Yes") {
        const modChannel = message.guild.channels.cache.find(
          channel => channel.name === "moderation-activity"
        );
        //moderation channel must be valid.
        if (modChannel) {
          modChannel.send(banEmbed);
        }
        user.ban({ reason: reason }).catch(err => console.log(err));
      }
      // anything but yes.
      else {
        message.channel.send("Very well, I shall hold off for now.");
      }
    });
  }
};

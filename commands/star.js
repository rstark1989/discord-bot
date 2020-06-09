const Discord = require("discord.js");

module.exports = {
  prefix: "star",
  description:
    "Gives the mentioned user a gold star! Use the format 'star <user> <reason>'",
  command: function star(message) {
    const target = message.mentions.members.first();
    if (!target) {
      message.channel.send(
        "Who shall I send that gold star to? You did not tell me!"
      );
      return;
    }
    const auth = message.author;
    const starEmbed = new Discord.MessageEmbed()
      .setColor("")
      .setTitle("You got a gold star!")
      .setDescription(`${auth} has given this shiny gold star to you~!`)
      .setImage(
        "https://github.com/nhcarrigan/discord-bot/blob/master/img/star.png?raw=true"
      )
      .setFooter("Keep being awesome! 🙃");
    const args = message.content.split(" ");
    const reason = args.slice(2, args.length);
    let reasonMessage = reason.join(" ");
    if (!reasonMessage) {
      reasonMessage = "But they didn't say why...";
    }
    starEmbed.addFields({
      name: "Reason",
      value: reasonMessage
    });
    target.send(starEmbed);
    message.channel.send(`I have given ${target} a gold star!`);
  }
};

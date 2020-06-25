const Discord = require("discord.js");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "status",
  description: "Gives the current status of this server.",
  command: function (message) {
    const joined = new Date(message.member.joinedTimestamp).toDateString();
    const created = new Date(message.guild.createdTimestamp).toDateString();
    const statusEmbed = new Discord.MessageEmbed()
      .setColor("#0099FF")
      .setTitle(`${message.guild.name}`)
      .setDescription("BEEP BOOP: Initiating server record search.")
      .setImage(
        `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`
      )
      .addFields(
        {
          name: "Server Creation Date:",
          value: `${created}`,
        },
        {
          name: "Your Server Join Date:",
          value: `${joined}`,
        },
        {
          name: "Server Owner:",
          value: `${message.guild.owner}`,
        },
        {
          name: "Member Count:",
          value: `${message.guild.memberCount}`,
        }
      )
      .setFooter("BEEP BOOP: Search complete.");
    message.channel.send(statusEmbed);
  },
};

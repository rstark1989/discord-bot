const Discord = require("discord.js");

module.exports = {
  prefix: "user",
  description:
    "Returns information on the tagged user. Use the format 'user <username>'",
  command: function(message) {
    const tUser = message.mentions.users.first();
    const mUser = message.mentions.members.first();
    if (!tUser || !mUser) {
      message.channel.send(
        "I am unable to locate that user's records. Please try again or contact the records administrator."
      );
      return;
    }
    const joined = new Date(mUser.joinedTimestamp).toDateString();
    const created = new Date(tUser.createdTimestamp).toDateString();
    const userEmbed = new Discord.MessageEmbed()
      .setTitle(mUser.nickname)
      .setDescription(`Here's some info about ${tUser}!`)
      .addFields(
        {
          name: "Creation Date",
          value: `Their account was created on ${created}`
        },
        {
          name: "Username",
          value: `Their full username is ${tUser.tag}`
        },
        {
          name: "Status",
          value: `Their current status is ${tUser.presence.status}`
        },
        {
          name: "Server Join Date",
          value: `They joined this server on ${joined}`
        },
        {
          name: "Roles",
          value: `They have these roles for the server: ${mUser.roles.cache
            .map(role => role.name)
            .join(", ")}`
        }
      )
      .setImage(
        `https://cdn.discordapp.com/avatars/${tUser.id}/${tUser.avatar}`
      );
    message.channel.send(userEmbed);
  }
};

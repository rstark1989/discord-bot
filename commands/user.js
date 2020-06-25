const Discord = require("discord.js");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "user",
  description:
    "Returns information on the tagged user. Use the format 'user <username>'",
  command: function (message) {
    const tUser = message.mentions.users.first();
    const mUser = message.mentions.members.first();
    if (!tUser || !mUser) {
      message.channel.send("ERROR 404: record not found or invalid user tag.");
      return;
    }
    const joined = new Date(mUser.joinedTimestamp).toDateString();
    const created = new Date(tUser.createdTimestamp).toDateString();
    const userEmbed = new Discord.MessageEmbed()
      .setTitle(mUser.displayName)
      .setDescription(`BEEP BOOP: Initiating record search for ${tUser}!`)
      .addFields(
        {
          name: "Creation Date:",
          value: `User account created on ${created}`,
        },
        {
          name: "Username:",
          value: `Full username is ${tUser.tag}`,
        },
        {
          name: "Status",
          value: `Current status is ${tUser.presence.status}`,
        },
        {
          name: "Server Join Date",
          value: `The user joined this server on ${joined}`,
        },
        {
          name: "Roles",
          value: `The user has these roles for the server: ${mUser.roles.cache
            .map((role) => role.name)
            .join(", ")}`,
        }
      )
      .setImage(
        `https://cdn.discordapp.com/avatars/${tUser.id}/${tUser.avatar}`
      )
      .setFooter("BEEP BOOP: Search complete.");
    message.channel.send(userEmbed);
  },
};

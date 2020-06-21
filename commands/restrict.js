const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "restrict",
  description:
    "Restrict a user's permissions. Use the format 'restrict <user> <reason>'. Only available to server moderators.",
  command: async function suspend(message) {
    //check for appropriate permissions
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      message.channel.send(
        `ERROR 401: ${message.author}, Missing permissions.`
      );
      return;
    }
    //check for log channel setting
    const modChannel = message.guild.channels.cache.find(
      (channel) => channel.name === config.log_channel
    );
    if (!modChannel) {
      message.channel.send(`ERROR 404: ${message.author}, Log channel not found.`);
      return;
    }
    //check for suspend category setting
    const suspendCategory = config.silence_category;
    const category = await message.guild.channels.cache.find(
      (c) => c.name === suspendCategory && c.type === "category"
    );
    if (!category) {
      message.channel.send(`ERROR 404: ${message.author}, Missing suspend category.`);
      return;
    }
    //check for suspend role setting
    const suspend = message.guild.roles.cache.find(
      (role) => role.name == config.silence_role
    );
    if (!suspend) {
      message.channel.send(`ERROR 404: ${message.author}, Missing suspend role.`);
      return;
    }

    const mod = message.author;
    const msgArguments = message.content.split(" ");
    const user = message.mentions.members.first();
    //check for valid user tag
    if (!user) {
      message.channel.send(`ERROR 404: ${mod}, Invalid user tag.`);
      return;
    }
    //cannot target self
    if (message.mentions.users.first() === mod) {
      message.channel.send(`ERROR 400: ${mod}, Cannot target self.`);
      return;
    }
    const reasonArg = msgArguments.slice(3, msgArguments.length);
    //check for reason provided, if none then create one.
    const reason = reasonArg.join(" ") || "No reason provided";
    //logging embed
    const restrictEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle(`Access Restricted!`)
      .addFields(
        {
          name: "What happened?",
          value: `${mod} has suspended ${user}.`,
        },
        {
          name: "Reason",
          value: `${reason}`,
        }
      )
      .setFooter("Please remember to follow our rules!");
    modChannel.send(restrictEmbed);
    //assign roles
    user.roles.set([suspend]);
    //create suspend channel
    const channelName = `suspended-${user.user.username}`;
    message.guild.channels.create(channelName, {
      type: "text",
      permissionOverwrites: [
        {
          id: user.id,
          allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"],
        },
        {
          id: message.guild.id,
          deny: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"],
        },
      ],
      parent: category,
    });
    user.send(
      "You have been suspended for violating our Code of Conduct. A channel has been created in the server for you to discuss this with the moderation team."
    );
  },
};

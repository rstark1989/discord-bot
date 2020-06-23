const config = require("../config.json");
module.exports = {
  prefix: "close",
  description: "Closes the channel.",
  command: async function (message) {
    const target = message.channel;
    console.log(message.channel.name)
    //check for log channel
    const log = message.guild.channels.cache.find(
      (channel) => channel.name === config.log_channel
    );
    //check for user permissions
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      message.channel.send(`ERROR 401: ${message.author}, Missing permissions.`);
      return
    }
    if (!log) {
      message.channel.send(`ERROR 404: ${message.author}, Log channel not found.`);
      return;
    }
    if (!message.channel.name.includes("suspended")) {
      message.channel.send(`ERROR 401: Channel cannot be deleted.`);
      return
    }
    target.delete().catch((e) => console.error(e));
    log.send(`${message.author} deleted a channel.`);
  },
};

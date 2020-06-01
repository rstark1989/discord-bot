const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  prefix: "ping",
  description: "Pings the bot to verify online status.",
  command: async function ping(message) {
    const pingMessage = await message.channel.send("Ping!");
    pingMessage.edit(
      "Ping: " +
        Math.round(pingMessage.createdTimestamp - message.createdTimestamp) +
        "ms"
    );
  }
};

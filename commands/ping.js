const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description ensures it shows in |help.
  prefix: "ping",
  description: "Pings the bot to verify online status.",
  command: async function ping(message) {
    //send Ping! and save messageID.
    const pingMessage = await message.channel.send("Ping!");
    //edit messageID to add ping time, based on time between ping command and Ping! response.
    pingMessage.edit(
      "Ping: " +
        Math.round(pingMessage.createdTimestamp - message.createdTimestamp) +
        "ms"
    );
  }
};

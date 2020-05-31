module.exports = {
  prefix: "ping",
  description: "Pings the bot to verify online status.",
  command: function ping(message) {
    message.channel.send("Pong!");
  }
};

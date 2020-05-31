module.exports = {
  prefix: "ping",
  descirption: "Pings the bot to verify online status.",
  command: function ping(message) {
    message.channel.send("Pong!");
  }
};

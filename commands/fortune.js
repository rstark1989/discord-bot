module.exports = {
  prefix: "fortune",
  description: "Tells you a fortune.",
  command: function(message) {
    const fortunes = [
      "You will find great wealth in the near future.",
      "Show others kindness and you shall receive kindness in return.",
      "Always remember those who helped you get where you are now."
    ];
    const index = Math.floor(Math.random() * fortunes.length);
    message.channel.send(fortunes[index]);
  }
};

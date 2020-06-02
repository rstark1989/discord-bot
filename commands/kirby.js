module.exports = {
  prefix: "kirby",
  description: "Do a little dance... make a little noise... GET DOWN TONIGHT!",
  command: function(message) {
    message.channel.send("<('.')>");
    setTimeout(() => message.channel.send("<('.'<)"), 1000);
    setTimeout(() => message.channel.send("(>'.')>"), 2000);
    setTimeout(() => message.channel.send("^('.')^"), 3000);
  }
};

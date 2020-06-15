module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "kirby",
  description: "Do a little dance... make a little noise... GET DOWN TONIGHT!",
  command: function(message) {
    message.channel.send("<('.')>");
    setTimeout(() => message.channel.send("<('.'<)"), 1000);
    setTimeout(() => message.channel.send("(>'.')>"), 2000);
    setTimeout(() => message.channel.send("^('.')^"), 3000);
  }
};

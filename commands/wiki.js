module.exports = {
  //prefix and description - prefix is necessary to trigger command, description ensures it shows in |help.
  prefix: "wiki",
  description:
    "Returns a URL to a wikipedia article. Use the format 'wiki <query>'.",
  command: function(message) {
    //removes "|wiki " - if your prefix is more than one character, you'll need to change 6.
    const argument = message.content.substring(6, message.content.length);
    const query = argument.replace(/\s/g, "_");
    message.channel.send(`https://en.wikipedia.org/wiki/${query}`);
  }
};

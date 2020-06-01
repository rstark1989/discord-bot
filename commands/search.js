module.exports = {
  prefix: "search",
  description:
    "Returns a Google search link for the provided query. Use the format 'search <query>'.",
  command: function(message) {
    const query = message.content
      .substring(8, message.content.length)
      .replace(/\s/g, "%20")
      .replace(/<@!.*>%20/g, "");
    message.channel.send(`https://google.com/search?q=${query}`);
  }
};

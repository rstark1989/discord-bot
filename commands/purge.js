module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is for the record
  prefix: "purge",
  description:
    "Purges messages from the current channel. Use the format 'purge <number>'. Restricted to server moderators.",
  command: async function (message) {
    //check for the appropriate permission first
    if (message.member.hasPermission("MANAGE_MESSAGES") == false) {
      message.channel.send(
        `ERROR 401: ${message.author}, missing permissions.`
      );
      return;
    }
    const arguments = message.content.split(" ");
    const howMany = parseInt(arguments[1]);
    //check if the argument isn't a number.
    if (isNaN(howMany)) {
      message.channel.send(`ERROR 400: ${message.author}, invalid number.`);
      return;
    }
    //bots can only delete 100 messages at a time. This is a discord limit.
    if (howMany > 100) {
      message.channel.send(`ERROR 400: Maximum delete 100.`);
      return;
    }
    //delete them!
    message.channel.messages.fetch({ limit: howMany }).then((messages) => {
      message.channel.bulkDelete(messages);
      message.channel
        .send(
          `BEEP BOOP: Initiating deletion protocol for ${howMany} messages.`
        )
        .then((message) => {
          message.delete({ timeout: 5000 });
        });
    });
  },
};

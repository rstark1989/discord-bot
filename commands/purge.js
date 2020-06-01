module.exports = {
  //prefix and description - prefix is necessary to trigger command, description ensures it shows in |help.
  prefix: "purge",
  description:
    "Purges messages from the current channel. Use the format 'purge <number>'. Restricted to server moderators.",
  command: async function(message) {
    //check for the appropriate permission first
    if (message.member.hasPermission("MANAGE_MESSAGES") == false) {
      message.channel.send(
        `My sincerest apologies, ${message.author}, but you lack the requisite permissions to perfom this command.`
      );
      return;
    }
    const arguments = message.content.split(" ");
    const howMany = parseInt(arguments[1]);
    //check if the argument isn't a number.
    if (isNaN(howMany)) {
      message.channel.send(
        `Pardon my shortcoming, ${message.author}, but I am afraid I did not understand how many messages you want to delete. Please try again.`
      );
      return;
    }
    //bots can only delete 100 messages at a time. This is a discord limit.
    if (howMany > 100) {
      message.channel.send(
        `This is truly not my fault, but I am not allowed to delete more than 100 messages at a time. Please forgive me!`
      );
      return;
    }
    //delete them!
    message.channel.messages.fetch({ limit: howMany }).then(messages => {
      message.channel.bulkDelete(messages);
      message.channel
        .send(`I have cleaned up ${howMany} messages, as you requested.`)
        .then(message => {
          message.delete({ timeout: 5000 });
        });
    });
  }
};

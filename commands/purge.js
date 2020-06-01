module.exports = {
  prefix: "purge",
  description:
    "Purges messages from the current channel. Use the format 'purge <number>'. Restricted to server moderators.",
  command: async function(message) {
    if (message.member.hasPermission("MANAGE_MESSAGES") == false) {
      message.channel.send(
        `My sincerest apologies, ${message.author}, but you lack the requisite permissions to perfom this command.`
      );
      return;
    }
    const arguments = message.content.split(" ");
    const howMany = parseInt(arguments[1]);
    if (isNaN(howMany)) {
      message.channel.send(
        `Pardon my shortcoming, ${message.author}, but I am afraid I did not understand how many messages you want to delete. Please try again.`
      );
      return;
    }
    if (howMany > 100) {
      message.channel.send(
        `This is truly not my fault, but I am not allowed to delete more than 100 messages at a time. Please forgive me!`
      );
      return;
    }
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

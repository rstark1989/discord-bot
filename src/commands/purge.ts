import { commandInt } from "../interfaces/commandInt";

export const purge: commandInt = {
  //prefix and description - prefix is necessary to trigger command, description is for the record
  prefix: "purge",
  description:
    "Purges **number** of messages from the current channel. Restricted to server moderators.",
  parameters: "`<number>` - number of messages to delete; no more than 100",
  command: async function (message) {
    //check for the appropriate permission first
    if (message.member?.hasPermission("MANAGE_MESSAGES") == false) {
      message.channel.send(
        `ERROR 401: ${message.author}, missing permissions.`
      );
      return;
    }
    const cmdarguments = message.content.split(" ");
    const howMany = parseInt(cmdarguments[1]);
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

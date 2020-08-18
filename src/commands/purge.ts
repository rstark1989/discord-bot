import { CommandInt } from "../interfaces/CommandInt";

export const purge: CommandInt = {
  prefix: "purge",
  description:
    "Purges **number** of messages from the current channel. Restricted to server moderators.",
  parameters: "`<number>` - number of messages to delete; no more than 100",
  command: async (message) => {
    if (message.member?.hasPermission("MANAGE_MESSAGES") == false) {
      message.channel.send(`ERROR 401: Missing permissions.`);
      return;
    }
    const cmdArguments = message.content.split(" ");
    const howMany = parseInt(cmdArguments[1]);
    if (isNaN(howMany)) {
      message.channel.send(`ERROR 400: Invalid number.`);
      return;
    }
    if (howMany > 100) {
      message.channel.send("ERROR 400: Maximum delete 100.");
      return;
    }
    message.channel.messages.fetch({ limit: howMany }).then((messages) => {
      if (message.channel.type === "text") {
        message.channel.bulkDelete(messages);
        message.channel
          .send(
            `BEEP BOOP: Initiating deletion protocol for ${howMany} messages.`
          )
          .then((message) => {
            message.delete({ timeout: 5000 });
          });
        return;
      }
      message.channel.send("ERROR 400: Can only delete from text channel.");
    });
  },
};

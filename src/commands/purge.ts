import { CommandInt } from "../interfaces/CommandInt";

export const purge: CommandInt = {
  prefix: "purge",
  description:
    "Purges **number** of messages from the current channel. Restricted to server moderators.",
  parameters: "`<number>` - number of messages to delete; no more than 100",
  command: async (message) => {
    if (!message.member?.hasPermission("MANAGE_MESSAGES")) {
      message.channel.send(
        `Sorry, but this command is restricted to administrators.`
      );
      return;
    }
    const cmdArguments = message.content.split(" ");
    const howMany = parseInt(cmdArguments[1]);
    if (isNaN(howMany)) {
      message.channel.send(`Sorry, but that is not a valid number.`);
      return;
    }
    if (howMany > 100) {
      message.channel.send(
        "Sorry, but I can only delete up to 100 messages at once."
      );
      return;
    }
    message.channel.messages.fetch({ limit: howMany }).then((messages) => {
      if (message.channel.type === "text") {
        message.channel.bulkDelete(messages);
        message.channel
          .send(`Okay, I will delete ${howMany} messages.`)
          .then((message) => {
            message.delete({ timeout: 5000 });
          });
        return;
      }
      message.channel.send("Sorry, but I can only clean up a text channel.");
    });
  },
};

import { CommandInt } from "../interfaces/CommandInt";

export const search: CommandInt = {
  prefix: "search",
  description: "Returns a Google search link for the provided **query**.",
  parameters: "`<query>`: the string to search for",
  command: (message) => {
    const query = message.content
      .substring(8, message.content.length)
      .replace(/\s/g, "%20")
      .replace(/<@!.*>%20/g, "");
    message.channel.send(
      `BEEP BOOP: Query complete. https://google.com/search?q=${query}`
    );
  },
};

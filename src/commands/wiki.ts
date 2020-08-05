import { CommandInt } from "../interfaces/CommandInt";

export const wiki: CommandInt = {
  prefix: "wiki",
  description: "Returns a URL to a wikipedia article based on the **query**.",
  parameters: "`<query>`: terms to search for",
  command: (message) => {
    const argument = message.content.substring(6, message.content.length);
    const query = argument.replace(/\s/g, "_");
    message.channel.send(
      `BEEP BOOP: Query complete. https://en.wikipedia.org/wiki/${query}`
    );
  },
};

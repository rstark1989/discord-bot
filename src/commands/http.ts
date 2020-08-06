import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";
import { httpStatusList } from "../resources/httpStatusList";

export const http: CommandInt = {
  prefix: "http",
  description:
    "Returns a definition for the status parameter. Includes a cute cat photo.",
  parameters: "`<status>`: the HTTP status to define",
  command: async (message) => {
    const cmdArgument = message.content.split(" ")[1];
    if (!cmdArgument) {
      message.channel.send("ERROR 400: No status provided.");
      return;
    }
    if (httpStatusList.indexOf(cmdArgument) === -1) {
      message.channel.send("ERROR 400: Invalid status code");
      return;
    }
    const httpEmbed = new MessageEmbed()
      .setTitle(`HTTP Status: ${cmdArgument}`)
      .setImage(`https://http.cat/${cmdArgument}.jpg`);
    message.channel.send(httpEmbed);
  },
};

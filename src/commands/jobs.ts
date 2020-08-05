import { commandInt } from "../interfaces/commandInt";
import * as config from "../../config.json";
import { MessageEmbed } from "discord.js";

export const jobs: commandInt = {
  prefix: "jobs",
  description: `Returns a LinkedIn job search for developers. Use the format \`${config.prefix}jobs [location]\`, where location is an optional parameter.`,
  command: (message) => {
    const parameter = message.content.substring(6);
    let url = "https://linkedin.com/jobs/search/?keywords=developer";
    if (parameter) {
      url += `&location=${parameter
        .replace(/\s/g, "%20")
        .replace(/,/g, "%2C")}`;
    }
    const jobsEmbed = new MessageEmbed()
      .setTitle("Job search!")
      .setDescription(
        `Query complete: [Here are some potential jobs for you.](${url})`
      );
    message.channel.send(jobsEmbed);
    return;
  },
};

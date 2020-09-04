import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";

export const jobs: CommandInt = {
  prefix: "jobs",
  description:
    "Returns a LinkedIn job search for developers. Optionally narrows the search by **location**.",
  parameters: "`<location>` - the specific location to search for jobs.",
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
      .setDescription(`[Here are some potential jobs for you.](${url})`);
    message.channel.send(jobsEmbed);
    return;
  },
};

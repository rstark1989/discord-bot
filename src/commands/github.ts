import { CommandInt } from "../interfaces/CommandInt";
import fetch from "node-fetch";
import { GithubInt, GithubRepoInt } from "../interfaces/GithubInt";
import { MessageEmbed } from "discord.js";

export const github: CommandInt = {
  prefix: "github",
  description: "Gets information on the <user>'s GitHub profile.",
  parameters: "`<user>`: The user to look for on GitHub",
  command: async (message) => {
    const cmdArguments = message.content.split(" ")[1];
    const ghUserData = await fetch(
      `https://api.github.com/users/${cmdArguments}`
    );
    const ghUser: GithubInt = await ghUserData.json();
    const ghRepoData = await fetch(
      `https://api.github.com/users/${cmdArguments}/repos?sort=updated`
    );
    const ghRepoParsed: GithubRepoInt[] = await ghRepoData.json();
    if (ghUser.message === "Not Found") {
      message.channel.send("ERROR 404: Data not found.");
      return;
    }
    if (!ghRepoParsed[0]) {
      const ghEmbed = new MessageEmbed()
        .setTitle(`Github User: ${ghUser.login}`)
        .setDescription(ghUser.bio || "No description provided")
        .setURL(ghUser.html_url)
        .addFields(
          { name: "Name", value: ghUser.name },
          {
            name: "Followers",
            value: ghUser.followers,
          },
          {
            name: "Join Date",
            value: new Date(ghUser.created_at).toLocaleDateString(),
          },
          {
            name: "Repository Counts",
            value: `${ghUser.public_repos} public repositories`,
          }
        );
      if (ghUser.avatar_url) {
        ghEmbed.setImage(ghUser.avatar_url);
      }
      message.channel.send(ghEmbed);
      return;
    }
    const ghRepo = ghRepoParsed.slice(0, 5);
    const repositories = ghRepo
      .map((el) => `[${el.name}](${el.html_url})`)
      .join(" | ");
    const ghEmbed = new MessageEmbed()
      .setTitle(`Github User: ${ghUser.login}`)
      .setDescription(ghUser.bio || "No description provided")
      .setURL(ghUser.html_url)
      .addFields(
        { name: "Name", value: ghUser.name },
        {
          name: "Followers",
          value: ghUser.followers,
        },
        {
          name: "Join Date",
          value: new Date(ghUser.created_at).toLocaleDateString(),
        },
        {
          name: "Repository Counts",
          value: `${ghUser.public_repos} public repositories`,
        },
        { name: "Recently updated", value: repositories }
      );
    if (ghUser.avatar_url) {
      ghEmbed.setImage(ghUser.avatar_url);
    }
    message.channel.send(ghEmbed);
  },
};

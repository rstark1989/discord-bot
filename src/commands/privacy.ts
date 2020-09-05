import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";

export const privacy: CommandInt = {
  prefix: "privacy",
  description:
    "Generates an embed with brief information about the bot's privacy policy.",
  parameters: "*none*",
  command: (message) => {
    const privacyEmbed = new MessageEmbed()
      .setTitle("Privacy Policy")
      .setDescription(
        "As part of my features, I collect and use some specific Discord related information. This information includes, but may not be limited to, your user name, nickname, and Discord ID. If you do not want this information to be collected, contact my creator <@!465650873650118659>. This will disable some cool features for your account, like my levelling system! [View my full policy](https://github.com/nhcarrigan/discord-bot/blob/main/PRIVACY.md)"
      );
    message.channel.send(privacyEmbed);
  },
};

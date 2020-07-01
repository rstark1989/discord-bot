import { commandInt } from "../interfaces/commandInt";
import { MessageEmbed } from "discord.js";

export const ping: commandInt = {
  //prefix and description - prefix is necessary to trigger command, description is for the record
  prefix: "ping",
  description: "Pings the bot to verify online status.",
  command: async function ping(message) {
    // Creates original message
    const msg = new MessageEmbed()
      .setColor("#FFFFFF")
      .setTitle("Ping Initiated")
      .setDescription("BEEP BOOP: Awaiting response.");

    //send Ping! and save messageID.
    const pingMessage = await message.channel.send(msg);

    //edit messageID to add ping time, based on time between ping command and Ping! response.
    let pingTime = Math.round(
      pingMessage.createdTimestamp - message.createdTimestamp
    );
    // changes color depending on pingTime
    let color = pingTime < 90 ? "#21ed4a" : "#f02222";
    // edited msg
    const msgEdit = new MessageEmbed()
      .setColor(color)
      .setTitle("Ping Successful")
      .setDescription(`BEEP BOOP: Response time is ${pingTime}ms.`);

    pingMessage.edit(msgEdit);
  },
};

const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
	//prefix and description - prefix is necessary to trigger command, description ensures it shows in |help.
	prefix      : "ping",
	description : "Pings the bot to verify online status.",
	command     : async function ping(message) {
		// Creates original message
    const msg = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setTitle("Ping")
      .setDescription("Pinging!");

		//send Ping! and save messageID.
		const pingMessage = await message.channel.send(msg);

		//edit messageID to add ping time, based on time between ping command and Ping! response.
		let pingTime = Math.round(pingMessage.createdTimestamp - message.createdTimestamp);
		// changes color depending on pingTime
		let color = pingTime < 90 ? "#21ed4a" : "#f02222";
		// edited msg
		const msgEdit = new Discord.MessageEmbed()
			.setColor(color)
			.setTitle("Pinged!")
			.setDescription(`Ping: ${pingTime}ms.`);

		pingMessage.edit(msgEdit);
	}
};

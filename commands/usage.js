const Discord = require("discord.js");
const Mongoose = require("mongoose");
const config = require("../config.json");

const commandLogSchema = new Mongoose.Schema({
  command: String,
  uses: Number,
});
const commandLog = Mongoose.model("commandLog", commandLogSchema);

module.exports = {
  prefix: "usage",
  description:
    "Gets the number of times a particular command has been used. Use the format 'usage <command>'.",
  listener: function (message) {
    const array = message.content.split(" ");
    const command = array[0].substring(1);
    commandLog.findOne({ command: command }, function (err, data) {
      let uses = 0;
      if (err || !data) {
        const newlog = new commandLog({ command: command, uses: 1 });
        newlog.save((err, data) => {
          if (err) console.error(err);
        });
      } else {
        const olduses = data.uses;
        data.uses = olduses + 1;
        data.save((err, data) => {
          if (err) console.error(err);
        });
      }
    });
  },
  command: function (message) {
    const array = message.content.split(" ");
    const command = array[1];
    commandLog.findOne({ command: command }, function (err, data) {
      if (err || !data) {
        message.channel.send("ERROR 404: Command history not found.");
      } else {
        const commandEmbed = new Discord.MessageEmbed()
          .setTitle(command)
          .setDescription(`This command has been used ${data.uses} times!`);
        message.channel.send(commandEmbed);
      }
    });
  },
};

const Discord = require("discord.js");
const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema({
  name: String,
  points: Number,
  userid: String
});
const user = Mongoose.model("user", userSchema);

module.exports = {
  prefix: "level",
  description: "Gets the user's current level.",
  listen: function(message) {
    user.findOne({ userid: message.author }, function(err, data) {
      if (err || !data) {
        const newuser = new user({
          name: message.author.username,
          points: 1,
          userid: message.author
        });
        newuser.save((err, data) => {
          if (err) console.log(err);
        });
      } else {
        const oldpoints = data.points % 100;
        data.points = data.points + Math.floor(Math.random() * 5) + 1;
        const currentpoints = data.points % 100;
        const currentexp = data.points;
        data.save((err, data) => {
          if (err) console.log(err);
        });
        if (currentpoints < oldpoints) {
          const currentlevel = parseInt(currentexp / 100);
          message.channel.send(
            `Congratulations ${message.author}! You have reached level ${currentlevel}!`
          );
        }
      }
    });
  },
  command: function(message) {
    user.findOne({ userid: message.author }, function(err, data) {
      if (err || !data) {
        message.channel.send(
          `I'm sorry, ${message.author}, but I couldn't find your record. Please try again.`
        );
        return;
      }
      const rankEmbed = new Discord.MessageEmbed()
        .setColor("#ab47e6")
        .setTitle(`${message.author.username}'s Ranking`)
        .setDescription("Here's what I've got for you!")
        .addFields(
          {
            name: "Experience Points",
            value: `${data.points} XP`
          },
          {
            name: "Level",
            value: `LVL ${Math.floor(data.points / 100)}`
          }
        )
        .setFooter("You level up with every 100 points.");
      message.channel.send(rankEmbed);
    });
  }
};

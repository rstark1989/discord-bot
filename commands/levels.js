const Discord = require("discord.js");
const Mongoose = require("mongoose");

//database model
const userSchema = new Mongoose.Schema({
  name: String,
  points: Number,
  userid: String
});
const user = Mongoose.model("user", userSchema);

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "level",
  description: "Gets the user's current level.",
  //this part listens to all messages
  listen: function(message) {
    //find user
    user.findOne({ userid: message.author }, function(err, data) {
      if (err || !data) {
        //if database doesn't have user yet, add them.
        const newuser = new user({
          name: message.author.username,
          points: 1,
          userid: message.author
        });
        newuser.save((err, data) => {
          if (err) console.log(err);
        });
      } else {
        //otherwise, update experience oldpoints
        const oldpoints = data.points % 100;
        data.points = data.points + Math.floor(Math.random() * 5) + 1;
        const currentpoints = data.points % 100;
        const currentexp = data.points;
        data.save((err, data) => {
          if (err) console.log(err);
        });
        //level up notifications
        if (currentpoints < oldpoints) {
          const currentlevel = parseInt(currentexp / 100);
          message.channel.send(
            `BEEP BOOP: Congratulations ${message.author}! You have reached level ${currentlevel}!`
          );
        }
      }
    });
  },
  //command can be called to get your current status
  command: function(message) {
    user.findOne({ userid: message.author }, function(err, data) {
      if (err || !data) {
        message.channel.send(`ERROR 404: Record not found.`);
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

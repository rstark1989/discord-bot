const Discord = require("discord.js");
const Mongoose = require("mongoose");
const config = require("../config.json");

const userSchema = new Mongoose.Schema({
  name: String,
  points: Number,
  userid: String
});
const user = Mongoose.model("user", userSchema);

module.exports = {
  command: function(message) {
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
        data.points = data.points + 1;
        const currentpoints = data.points;
        data.save((err, data) => {
          if (err) console.log(err);
        });
        if (currentpoints % 100 === 0) {
          const currentlevel = parseInt(currentpoints / 100);
          message.channel.send(
            `Congratulations ${message.author}! You have reached level ${currentlevel}!`
          );
        }
      }
    });
  }
};

import { listenerInt } from "../interfaces/listenerInt";
import { user, userInt } from "../interfaces/userInt";

export const levelListen: listenerInt = {
  name: "Level up!",
  description:
    "Grants 1 to 5 experience points for each message you send, and you level up at every 100 experience points.",
  listener: function (message) {
    //find user
    user.findOne({ userid: message.author.toString() }, function (
      err: Error,
      data: userInt
    ) {
      if (err || !data) {
        //if database doesn't have user yet, add them.
        const newuser = new user({
          name: message.author.username,
          points: 1,
          userid: message.author,
        });
        newuser.save((err: Error) => {
          if (err) console.log(err);
        });
      } else {
        //otherwise, update experience oldpoints
        const oldpoints = data.points % 100;
        data.points = data.points + Math.floor(Math.random() * 5) + 1;
        const currentpoints = data.points % 100;
        const currentexp = data.points;
        data.save((err: Error) => {
          if (err) console.log(err);
        });
        //level up notifications
        if (currentpoints < oldpoints) {
          const currentlevel = Math.floor(currentexp / 100);
          message.channel.send(
            `BEEP BOOP: Congratulations <@!${message.author}>! You have reached level ${currentlevel}!`
          );
        }
      }
    });
  },
};

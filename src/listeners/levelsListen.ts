import { ListenerInt } from "../interfaces/ListenerInt";
import { User, UserInt } from "../interfaces/UserInt";

export const levelListen: ListenerInt = {
  name: "Level up!",
  description:
    "Grants 1 to 5 experience points for each message you send, and you level up at every 100 experience points.",
  listener: (message) => {
    User.findOne(
      { userid: message.author.toString() },
      (err: Error, data: UserInt) => {
        if (err || !data) {
          const newUser = new User({
            name: message.author.username,
            points: 1,
            userid: message.author,
          });
          newUser.save((err: Error) => {
            if (err) console.log(err);
          });
          return;
        }
        const oldPoints = data.points % 100;
        data.points = data.points + Math.floor(Math.random() * 5) + 1;
        const currentPoints = data.points % 100;
        const currentExp = data.points;
        data.save((err: Error) => {
          if (err) console.log(err);
        });
        if (currentPoints < oldPoints) {
          const currentLevel = Math.floor(currentExp / 100);
          message.channel.send(
            `BEEP BOOP: Congratulations <@!${message.author}>! You have reached level ${currentLevel}!`
          );
        }
      }
    );
  },
};

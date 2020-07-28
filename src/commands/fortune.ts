import { commandInt } from "../interfaces/commandInt";

//list of fortunes. Add more here to your desire.
export const fortunes = [
  "You will find great wealth in the near future.",
  "Show others kindness and you shall receive kindness in return.",
  "Always remember those who helped you get where you are now.",
];
export const fortune: commandInt = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "fortune",
  description: "Tells you a fortune.",
  command: function (message) {
    //pick random fortune - accounts for new fortunes so does not need to be updated with additions.
    const index = Math.floor(Math.random() * fortunes.length);
    message.channel.send(`BEEP BOOP: ${fortunes[index]}`);
  },
};

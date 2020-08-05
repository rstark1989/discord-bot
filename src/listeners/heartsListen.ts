import config from "../../config.json";
import { listenerInt } from "../interfaces/listenerInt";
const authors = config.love;
const heartList = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍"];
export const hearts: listenerInt = {
  name: "Love",
  description: "Gives love to specific users.",
  listener: function (message) {
    for (const author in authors) {
      if (message.author.id === authors[author]) {
        const random = Math.floor(Math.random() * heartList.length);
        message.react(heartList[random]).catch((e) => console.error(e));
      }
    }
  },
};

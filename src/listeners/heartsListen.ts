import config from "../../config.json";
import { listenerInt } from "../interfaces/listenerInt";
const authors = config.love;
const heartList = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍"];
export const hearts: listenerInt = {
  listener: function (message) {
    for (let author in authors) {
      if (message.author.id === authors[author]) {
        const random = Math.floor(Math.random() * heartList.length);
        message.react(heartList[random]).catch((e) => console.error(e));
      }
    }
  },
};

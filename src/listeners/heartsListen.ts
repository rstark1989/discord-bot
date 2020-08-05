import config from "../../config.json";
import { ListenerInt } from "../interfaces/ListenerInt";
const authors = config.love;
const heartList = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍"];
export const hearts: ListenerInt = {
  name: "Love",
  description: "Gives love to specific users.",
  listener: (message) => {
    for (const author in authors) {
      if (message.author.id === authors[author]) {
        const random = Math.floor(Math.random() * heartList.length);
        message.react(heartList[random]).catch((e) => console.error(e));
      }
    }
  },
};

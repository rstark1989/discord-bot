const config = require("../config.json")
const authors = config.love;
const heartList = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍"]
module.exports = {
  listener: function (message) {
    for (let author in authors) {
      if (message.author.id === authors[author]) {
          const random = Math.floor(Math.random() * heartList.length)
        message.react(heartList[random]).catch((e) => console.error(e));
      }
    }
  },
};

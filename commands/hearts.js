const authors = ['465650873650118659'];
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

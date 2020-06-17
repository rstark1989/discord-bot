module.exports = {
  prefix: "cat",
  description: "A cat walked across the keyboard!",
  command: function(message) {
    const len = Math.floor(Math.random() * 100);
    let str = "";
    for (let i = 0; i < len; i++) {
      const char = Math.floor(Math.random() * 26 + 64);
      str = str + String.fromCharCode(char);
    }
    message.channel.send(str);
    setTimeout(
      () => message.channel.send("BEEP BOOP: Feline Input Detected"),
      1000
    );
  }
};

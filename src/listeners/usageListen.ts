import { ListenerInt } from "../interfaces/ListenerInt";
import { CommandLog, CommandLogInt } from "../interfaces/UsageInt";

export const usageListen: ListenerInt = {
  name: "Command Uses",
  description: "Tracks the number of times each command has been used.",
  listener: function (message) {
    const array = message.content.split(" ");
    const command = array[0].substring(1);
    CommandLog.findOne({ command: command }, function (
      err: Error,
      data: CommandLogInt
    ) {
      if (err || !data) {
        const newLog = new CommandLog({ command: command, uses: 1 });
        newLog.save((err: Error) => {
          if (err) console.error(err);
        });
      } else {
        const oldUses = data.uses;
        data.uses = oldUses + 1;
        data.save((err: Error) => {
          if (err) console.error(err);
        });
      }
    });
  },
};

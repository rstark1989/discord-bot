import { ListenerInt } from "../interfaces/ListenerInt";
import { CommandLog, CommandLogInt } from "../interfaces/UsageInt";

export const usageListen: ListenerInt = {
  name: "Command Uses",
  description: "Tracks the number of times each command has been used.",
  listener: (message) => {
    const array = message.content.split(" ");
    const command = array[0].substring(1);
    CommandLog.findOne(
      { command: command },
      (err: Error, data: CommandLogInt) => {
        if (err || !data) {
          const newLog = new CommandLog({
            command: command,
            uses: 1,
            lastCalled: new Date(Date.now()).toLocaleDateString(),
          });
          newLog.save((err: Error) => {
            if (err) console.error(err);
          });
          return;
        }
        const oldUses = data.uses;
        data.uses = oldUses + 1;
        data.lastCalled = new Date(Date.now()).toLocaleDateString();
        data.save((err: Error) => {
          if (err) console.error(err);
        });
      }
    );
  },
};

import { listenerInt } from "../interfaces/listenerInt";
import { Document, Schema, model } from "mongoose";
import { commandLog, commandLogInt } from "../interfaces/usageInt";

export const usageListen: listenerInt = {
  listener: function (message) {
    const array = message.content.split(" ");
    const command = array[0].substring(1);
    commandLog.findOne({ command: command }, function (
      err: Error,
      data: commandLogInt
    ) {
      let uses = 0;
      if (err || !data) {
        const newlog = new commandLog({ command: command, uses: 1 });
        newlog.save((err, data) => {
          if (err) console.error(err);
        });
      } else {
        const olduses = data.uses;
        data.uses = olduses + 1;
        data.save((err: Error) => {
          if (err) console.error(err);
        });
      }
    });
  },
};

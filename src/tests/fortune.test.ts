import { fortuneTest, fortunes } from "../commands/fortune";
import { assert } from "chai";
import { Message } from "discord.js";

describe("Fortune command", () => {
  it("should be a string", () => {
    assert.isString(
      fortuneTest.testCommand({ content: "|fortune" } as Partial<Message>),
      "fortune command should return a string"
    );
  });
  it("should give a fortune", () => {
    assert.isAbove(
      fortunes.indexOf(
        fortuneTest.testCommand({ content: "|fortune" } as Partial<Message>)
      ),
      -1
    );
  });
});

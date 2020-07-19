import { aboutTest } from "../commands/about";
import { assert } from "chai";
import { Message } from "discord.js";
import packageInfo from "../../package.json";

describe("About command", () => {
  it("should return correct version", () => {
    assert.equal(
      aboutTest.testCommand({ content: "|about" } as Partial<Message>),
      packageInfo.version
    );
  });
});

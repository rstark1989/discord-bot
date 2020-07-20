import { about } from "../commands/about";
import { assert } from "chai";
import { Message } from "discord.js";
import packageInfo from "../../package.json";

describe("About command", () => {
  it("should return correct version", async () => {
    const result = await about.command(({ id: "test" } as Partial<
      Message
    >) as never);
    assert.equal(result, packageInfo.version);
  });
});

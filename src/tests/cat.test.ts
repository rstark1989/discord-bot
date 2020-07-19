import { catTest } from "../commands/cat";
import { assert } from "chai";

describe("Cat command", () => {
  it("should return a string", () => {
    assert.isString(catTest.testCommand());
  });
  it("should be between 1 and 100 characters", () => {
    assert.isAtMost(catTest.testCommand().length, 100);
    assert.isAtLeast(catTest.testCommand().length, 1);
  });
});

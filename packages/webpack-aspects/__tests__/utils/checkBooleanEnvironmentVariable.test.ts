import { random } from "faker";

import { checkBooleanEnvironmentVariable } from "../../src/utils";

import { restoreEnvironment, saveEnvironment, i } from "../helpers";

const samples: [string | undefined, boolean][] = [
  [undefined, false],
  ["false", false],
  [random.uuid(), false],

  ["1", true],
  ["true", true]
];

function createVariableName() {
  return random
    .word()
    .replace(" ", "_")
    .toUpperCase();
}

describe("utils", () => {
  describe("checkBooleanEnvironmentVariable", () => {
    beforeEach(saveEnvironment);
    afterEach(restoreEnvironment);

    for (const [value, expected] of samples) {
      const variableName = createVariableName();

      describe(`when variable is equals to ${i(value)}`, () => {
        it(`returns ${i(expected)}`, () => {
          process.env[variableName] = value;

          const actual = checkBooleanEnvironmentVariable(variableName);

          expect(actual).toBe(expected);
        });
      });
    }
  });
});

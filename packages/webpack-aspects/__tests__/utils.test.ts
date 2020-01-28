import faker from "faker";

import { checkBooleanEnvironmentVariable } from "../src/utils";

import { saveEnvironment, restoreEnvironment } from "./helpers";

describe("@react-dev-env/webpack-aspects", () => {
  describe("utils", () => {
    describe("checkBooleanEnvironmentVariable", () => {
      beforeEach(saveEnvironment);
      afterEach(restoreEnvironment);

      const samples: [string | undefined, boolean][] = [
        [undefined, false],
        ["false", false],
        [faker.random.uuid(), false],
        ["1", true],
        ["true", true]
      ];

      for (const [value, expected] of samples) {
        const variableName = faker.random
          .word()
          .replace(" ", "_")
          .toUpperCase();

        describe(`when variable is equals to "${value || "undefined"}"`, () => {
          it(`returns "${expected}"`, () => {
            process.env[variableName] = value;

            const actual = checkBooleanEnvironmentVariable(variableName);

            expect(actual).toBe(expected);
          });
        });
      }
    });
  });
});

import { createEnvironment } from "../../src/environment";

import { i, restoreEnvironment, saveEnvironment } from "../helpers";

const samples: [string, string | undefined, boolean][] = [
  ["production", "true", true],
  ["production", "1", true],
  ["production", "false", false],
  ["production", undefined, false],

  ["development", "true", false],
  ["development", "1", false],
  ["development", "false", false],
  ["development", undefined, false]
];

describe("environment", () => {
  describe("isProfileBuild", () => {
    beforeEach(saveEnvironment);
    afterEach(restoreEnvironment);

    for (const [environment, profile, expected] of samples) {
      describe(`when "process.env.NODE_ENV" is ${i(environment)}`, () => {
        describe(`when "process.env.PROFILE" is ${i(profile)})`, () => {
          it(`equals to ${i(expected)}`, async () => {
            process.env.NODE_ENV = environment;
            process.env.PROFILE = profile;

            const { isProfileBuild } = await createEnvironment();

            expect(isProfileBuild).toBe(expected);
          });
        });
      });
    }
  });
});

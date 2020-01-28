import { createEnvironment } from "../../src/environment";

import { saveEnvironment, restoreEnvironment, i } from "../helpers";

const samples: [string, boolean][] = [
  ["development", true],
  ["production", false]
];

describe("environment", () => {
  describe("isDevelopmentBuild", () => {
    beforeEach(saveEnvironment);
    afterEach(restoreEnvironment);

    for (const [environment, expected] of samples) {
      describe(`when "process.env.NODE_ENV" is ${i(environment)}`, () => {
        it(`equals to ${i(expected)}`, async () => {
          process.env.NODE_ENV = environment;

          const { isDevelopmentBuild } = await createEnvironment();

          expect(isDevelopmentBuild).toBe(expected);
        });
      });
    }
  });
});

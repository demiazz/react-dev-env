import { createEnvironment } from "../../src/environment";

import { saveEnvironment, restoreEnvironment, i } from "../helpers";

const samples: [string, boolean][] = [
  ["development", false],
  ["production", true]
];

describe("environment", () => {
  describe("isProductionBuild", () => {
    beforeEach(saveEnvironment);
    afterEach(restoreEnvironment);

    for (const [environment, expected] of samples) {
      describe(`when "process.env.NODE_ENV" is ${i(environment)}`, () => {
        it(`equals to ${i(expected)}`, async () => {
          process.env.NODE_ENV = environment;

          const { isProductionBuild } = await createEnvironment({
            rootDir: __dirname
          });

          expect(isProductionBuild).toBe(expected);
        });
      });
    }
  });
});

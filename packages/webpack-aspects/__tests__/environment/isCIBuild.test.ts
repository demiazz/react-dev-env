import { createEnvironment } from "../../src/environment";

import { i, restoreEnvironment, saveEnvironment } from "../helpers";

const samples: [string | undefined, boolean][] = [
  ["true", true],
  ["1", true],
  ["false", false],
  [undefined, false]
];

describe("environment", () => {
  describe("isCIBuild", () => {
    beforeEach(saveEnvironment);
    afterEach(restoreEnvironment);

    for (const [ci, expected] of samples) {
      describe(`when "process.env.CI" is ${i(ci)}`, () => {
        it(`equals to ${i(expected)}`, async () => {
          process.env.CI = ci;

          const { isCIBuild } = await createEnvironment();

          expect(isCIBuild).toBe(expected);
        });
      });
    }
  });
});

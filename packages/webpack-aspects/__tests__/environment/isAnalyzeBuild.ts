import { createEnvironment } from "../../src/environment";

import { i, restoreEnvironment, saveEnvironment } from "../helpers";

const samples: [string | undefined, boolean][] = [
  ["true", true],
  ["1", true],
  ["false", false],
  [undefined, false]
];

describe("environment", () => {
  describe("isAnalyzeBuild", () => {
    beforeEach(saveEnvironment);
    afterEach(restoreEnvironment);

    for (const [analyze, expected] of samples) {
      describe(`when "process.env.ANALYZE" is ${i(analyze)}`, () => {
        it(`equals to ${i(expected)}`, async () => {
          process.env.ANALYZE = analyze;

          const { isAnalyzeBuild } = await createEnvironment();

          expect(isAnalyzeBuild).toBe(expected);
        });
      });
    }
  });
});

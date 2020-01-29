import faker from "faker";
import { resolve } from "path";

import { createEnvironment } from "../../src/environment";

describe("environment", () => {
  describe("cacheDirFor", () => {
    it("returns path for the given aspect which relative to cache directory", async () => {
      const aspect = faker.random.uuid();
      const { cacheDir, cacheDirFor } = await createEnvironment({
        rootDir: __dirname
      });
      const expected = resolve(cacheDir, aspect);

      expect(cacheDirFor(aspect)).toEqual(expected);
    });
  });
});

import faker from "faker";
import { resolve } from "path";

import { createEnvironment } from "../../src/environment";

describe("environment", () => {
  describe("publicDir", () => {
    const rootDir = __dirname;
    const publicDir = `public-${faker.random.number()}`;

    describe("when path doesn't given", () => {
      it('returns path to the "public" directory which relative to root directory', async () => {
        const expected = resolve(rootDir, "public");
        const { publicDir: actual } = await createEnvironment({ rootDir });

        expect(actual).toEqual(expected);
      });
    });

    describe("when absolute path is given", () => {
      it("returns given path", async () => {
        const expected = resolve(rootDir, publicDir);
        const { publicDir: actual } = await createEnvironment({
          rootDir,
          publicDir: expected
        });

        expect(actual).toEqual(expected);
      });
    });

    describe("when relative path is given", () => {
      it("returns resolved path relative to root directory", async () => {
        const expected = resolve(rootDir, publicDir);
        const { publicDir: actual } = await createEnvironment({
          rootDir,
          publicDir
        });

        expect(actual).toEqual(expected);
      });
    });
  });
});

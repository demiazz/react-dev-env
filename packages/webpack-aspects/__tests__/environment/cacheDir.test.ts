import { resolve } from "path";
import faker from "faker";
import { createEnvironment } from "../../src/environment";

describe("environment", () => {
  describe("cacheDir", () => {
    const rootDir = __dirname;
    const cacheDir = `cache-${faker.random.number()}`;

    describe("when path doesn't given", () => {
      it('returns path to the "cache" directory which relative to root directory', async () => {
        const expected = resolve(rootDir, "cache");
        const { cacheDir: actual } = await createEnvironment({ rootDir });

        expect(actual).toEqual(expected);
      });
    });

    describe("when absolute path is given", () => {
      it("returns given path", async () => {
        const expected = resolve(rootDir, cacheDir);
        const { cacheDir: actual } = await createEnvironment({
          rootDir,
          cacheDir: expected
        });

        expect(actual).toEqual(expected);
      });
    });

    describe("when relative path is given", () => {
      it("returns resolved path relative to root directory", async () => {
        const expected = resolve(rootDir, cacheDir);
        const { cacheDir: actual } = await createEnvironment({
          rootDir,
          cacheDir
        });

        expect(actual).toEqual(expected);
      });
    });
  });
});

import faker from "faker";
import { resolve } from "path";

import { createEnvironment } from "../../src/environment";

describe("environment", () => {
  describe("srcDir", () => {
    const rootDir = __dirname;
    const srcDir = `src-${faker.random.number()}`;

    describe("when path doesn't given", () => {
      it('returns path to the "src" directory which relative to root directory', async () => {
        const expected = resolve(rootDir, "src");
        const { srcDir: actual } = await createEnvironment({ rootDir });

        expect(actual).toEqual(expected);
      });
    });

    describe("when absolute path is given", () => {
      it("returns given path", async () => {
        const expected = resolve(rootDir, srcDir);
        const { srcDir: actual } = await createEnvironment({
          rootDir,
          srcDir: expected
        });

        expect(actual).toEqual(expected);
      });
    });

    describe("when relative path is given", () => {
      it("returns resolved path relative to root directory", async () => {
        const expected = resolve(rootDir, srcDir);
        const { srcDir: actual } = await createEnvironment({
          rootDir,
          srcDir
        });

        expect(actual).toEqual(expected);
      });
    });
  });
});

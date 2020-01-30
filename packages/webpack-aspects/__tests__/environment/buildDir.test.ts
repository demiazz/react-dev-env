import faker from "faker";
import { resolve } from "path";

import { createEnvironment } from "../../src/environment";

describe("environment", () => {
  describe("buildDir", () => {
    const rootDir = __dirname;
    const buildDir = `build-${faker.random.number()}`;

    describe("when path doesn't given", () => {
      it('returns path to the "build" directory which relative to root directory', async () => {
        const expected = resolve(rootDir, "build");
        const { buildDir: actual } = await createEnvironment({ rootDir });

        expect(actual).toEqual(expected);
      });
    });

    describe("when absolute path is given", () => {
      it("returns given path", async () => {
        const expected = resolve(rootDir, buildDir);
        const { buildDir: actual } = await createEnvironment({
          rootDir,
          buildDir: expected
        });

        expect(actual).toEqual(expected);
      });
    });

    describe("when relative path is given", () => {
      it("returns resolved path relative to root directory", async () => {
        const expected = resolve(rootDir, buildDir);
        const { buildDir: actual } = await createEnvironment({
          rootDir,
          buildDir
        });

        expect(actual).toEqual(expected);
      });
    });
  });
});

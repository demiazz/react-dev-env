import { resolve } from "path";

import { createEnvironment } from "../../src/environment";

describe("environment", () => {
  describe("rootDir", () => {
    describe("when given absolute path", () => {
      it("returns given root dir", async () => {
        const expected = resolve(__dirname, "root");
        const { rootDir: actual } = await createEnvironment({
          rootDir: expected
        });

        expect(actual).toEqual(expected);
      });
    });

    describe("when given relative path", () => {
      it("returns resolved path relative to current working directory", async () => {
        const rootDir = "root";
        const expected = resolve(process.cwd(), rootDir);
        const { rootDir: actual } = await createEnvironment({ rootDir });

        expect(actual).toEqual(expected);
      });
    });
  });
});

import faker from "faker";
import { checkBooleanEnvironmentVariable } from "../src/utils";

describe("@react-dev-env/webpack-aspects", () => {
  describe("utils", () => {
    describe("checkBooleanEnvironmentVariable", () => {
      let environmentBackup: NodeJS.ProcessEnv;
      let variableName: string;

      beforeEach(() => {
        environmentBackup = process.env;

        process.env = {};

        variableName = faker.random
          .word()
          .replace(" ", "_")
          .toUpperCase();
      });

      afterEach(() => {
        process.env = environmentBackup;
      });

      describe("when variable is not defined", () => {
        it("returns `false`", () => {
          expect(checkBooleanEnvironmentVariable(variableName)).toBe(false);
        });
      });

      describe("when variable is equals to `1`", () => {
        it("returns `true`", () => {
          process.env[variableName] = "1";

          expect(checkBooleanEnvironmentVariable(variableName)).toBe(true);
        });
      });

      describe("when variable is equals to `true`", () => {
        it("returns `true`", () => {
          process.env[variableName] = "true";

          expect(checkBooleanEnvironmentVariable(variableName)).toBe(true);
        });
      });

      describe("when variable is equals to `false`", () => {
        it("returns `false`", () => {
          process.env[variableName] = "false";

          expect(checkBooleanEnvironmentVariable(variableName)).toBe(false);
        });
      });

      describe("when variable is equals to any value", () => {
        it("returns `false`", () => {
          process.env[variableName] = faker.random.uuid();

          expect(checkBooleanEnvironmentVariable(variableName)).toBe(false);
        });
      });
    });
  });
});

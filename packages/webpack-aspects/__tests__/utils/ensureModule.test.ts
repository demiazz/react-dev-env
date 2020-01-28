import { Configuration, Module } from "webpack";

import { ensureModule } from "../../src/utils";

describe("utils", () => {
  describe("ensureModule", () => {
    describe('when configuration have no "module" property', () => {
      let configuration: Configuration;

      beforeEach(() => {
        configuration = {};
      });

      it("adds property", () => {
        ensureModule(configuration);

        expect(configuration.module).toEqual({
          rules: []
        });
      });

      it("returns property", () => {
        const module = ensureModule(configuration);

        expect(module).toBe(configuration.module);
      });
    });

    describe('when configuration have "module" property', () => {
      let configuration: Configuration;
      let module: Module;

      beforeEach(() => {
        module = {
          rules: [
            {
              test: /\.js$/,
              use: "babel-loader"
            }
          ]
        };

        configuration = {
          module
        };
      });

      it("don't change property", () => {
        ensureModule(configuration);

        expect(configuration.module).toEqual(module);
      });

      it("returns property", () => {
        const module = ensureModule(configuration);

        expect(module).toBe(configuration.module);
      });
    });
  });
});

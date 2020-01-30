import { Configuration, Output } from "webpack";

import { ensureOutput } from "../../src/utils";

describe("utils", () => {
  describe("ensureOutput", () => {
    describe('when configuration have no "output" property', () => {
      let configuration: Configuration;

      beforeEach(() => {
        configuration = {};
      });

      it("adds property", () => {
        ensureOutput(configuration);

        expect(configuration.output).toEqual({});
      });

      it("returns property", () => {
        const output = ensureOutput(configuration);

        expect(output).toBe(configuration.output);
      });
    });

    describe('when configuration have "output" property', () => {
      let configuration: Configuration;
      let output: Output;

      beforeEach(() => {
        output = {
          path: "/build"
        };

        configuration = {
          output
        };
      });

      it("don't change property", () => {
        ensureOutput(configuration);

        expect(configuration.output).toEqual(output);
      });

      it("returns property", () => {
        const output = ensureOutput(configuration);

        expect(output).toBe(configuration.output);
      });
    });
  });
});

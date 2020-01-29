import { Tapable } from "tapable";
import { Configuration, Plugin } from "webpack";

import { ensureMinimizer } from "../../src/utils";

class AbstractMinimizer implements Plugin {
  apply() {}
}

describe("utils", () => {
  describe("ensureMinimizer", () => {
    describe('when configuration have no "optimization" property', () => {
      let configuration: Configuration;

      beforeEach(() => {
        configuration = {};
      });

      it("adds property", () => {
        ensureMinimizer(configuration);

        expect(configuration.optimization?.minimizer).toEqual([]);
      });

      it("returns property", () => {
        const minimizer = ensureMinimizer(configuration);

        expect(minimizer).toBe(configuration.optimization?.minimizer);
      });
    });

    describe('when configuration have "optimization" property, but have no "optimization.minimizer" property', () => {
      let configuration: Configuration;

      beforeEach(() => {
        configuration = {
          optimization: {}
        } as Configuration;
      });

      it("adds property", () => {
        ensureMinimizer(configuration);

        expect(configuration.optimization?.minimizer).toEqual([]);
      });

      it("returns property", () => {
        const minimizer = ensureMinimizer(configuration);

        expect(minimizer).toBe(configuration.optimization?.minimizer);
      });
    });

    describe('when configuration have "optimization.minimizer" property', () => {
      let configuration: Configuration;
      let minimizer: (Plugin | Tapable.Plugin)[];

      beforeEach(() => {
        minimizer = [new AbstractMinimizer()];

        configuration = {
          optimization: {
            minimizer
          }
        };
      });

      it("don't change property", () => {
        ensureMinimizer(configuration);

        expect(configuration.optimization?.minimizer).toEqual(minimizer);
      });

      it("returns property", () => {
        const minimizer = ensureMinimizer(configuration);

        expect(minimizer).toBe(configuration.optimization?.minimizer);
      });
    });
  });
});

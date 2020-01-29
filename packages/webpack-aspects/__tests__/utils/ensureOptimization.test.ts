import { Configuration, Options } from "webpack";

import { ensureOptimization } from "../../src/utils";

describe("utils", () => {
  describe("ensureOptimization", () => {
    describe('when configuration have no "optimization" property', () => {
      let configuration: Configuration;

      beforeEach(() => {
        configuration = {};
      });

      it("adds property", () => {
        ensureOptimization(configuration);

        expect(configuration.optimization).toEqual({});
      });

      it("returns property", () => {
        const optimization = ensureOptimization(configuration);

        expect(optimization).toBe(configuration.optimization);
      });
    });

    describe('when configuration have "optimization" property', () => {
      let configuration: Configuration;
      let optimization: Options.Optimization;

      beforeEach(() => {
        optimization = {
          sideEffects: true
        };

        configuration = {
          optimization
        };
      });

      it("don't change property", () => {
        ensureOptimization(configuration);

        expect(configuration.optimization).toEqual(optimization);
      });

      it("returns property", () => {
        const optimization = ensureOptimization(configuration);

        expect(optimization).toBe(configuration.optimization);
      });
    });
  });
});

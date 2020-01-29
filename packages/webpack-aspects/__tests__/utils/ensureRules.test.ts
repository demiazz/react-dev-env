import { Configuration, RuleSetRule } from "webpack";

import { ensureRules } from "../../src/utils";

describe("utils", () => {
  describe("ensureRules", () => {
    describe('when configuration have no "module" property', () => {
      let configuration: Configuration;

      beforeEach(() => {
        configuration = {};
      });

      it("adds property", () => {
        ensureRules(configuration);

        expect(configuration.module?.rules).toEqual([]);
      });

      it("returns property", () => {
        const rules = ensureRules(configuration);

        expect(rules).toBe(configuration.module?.rules);
      });
    });

    describe('when configuration have "module" property, but have no "module.rules" property', () => {
      let configuration: Configuration;

      beforeEach(() => {
        configuration = {
          module: {}
        } as Configuration;
      });

      it("adds property", () => {
        ensureRules(configuration);

        expect(configuration.module?.rules).toEqual([]);
      });

      it("returns property", () => {
        const rules = ensureRules(configuration);

        expect(rules).toBe(configuration.module?.rules);
      });
    });

    describe('when configuration have "module.rules" property', () => {
      let configuration: Configuration;
      let rules: RuleSetRule[];

      beforeEach(() => {
        rules = [
          {
            test: /\.js$/,
            use: "babel-loader"
          }
        ];

        configuration = {
          module: {
            rules
          }
        };
      });

      it("don't change property", () => {
        ensureRules(configuration);

        expect(configuration.module?.rules).toEqual(rules);
      });

      it("returns property", () => {
        const rules = ensureRules(configuration);

        expect(rules).toBe(configuration.module?.rules);
      });
    });
  });
});

import { Configuration, Plugin } from "webpack";

import { ensurePlugins } from "../../src/utils";

class AbstractPlugin implements Plugin {
  apply() {}
}

describe("utils", () => {
  describe("ensurePlugins", () => {
    describe('when configuration have no "plugins" property', () => {
      let configuration: Configuration;

      beforeEach(() => {
        configuration = {};
      });

      it("adds property", () => {
        ensurePlugins(configuration);

        expect(configuration.plugins).toEqual([]);
      });

      it("returns property", () => {
        const plugins = ensurePlugins(configuration);

        expect(plugins).toBe(configuration.plugins);
      });
    });

    describe('when configuration have "plugins" property', () => {
      let configuration: Configuration;
      let plugins: Plugin[];

      beforeEach(() => {
        plugins = [new AbstractPlugin()];

        configuration = {
          plugins
        };
      });

      it("don't change property", () => {
        ensurePlugins(configuration);

        expect(configuration.plugins).toEqual(plugins);
      });

      it("returns property", () => {
        const plugins = ensurePlugins(configuration);

        expect(plugins).toBe(configuration.plugins);
      });
    });
  });
});

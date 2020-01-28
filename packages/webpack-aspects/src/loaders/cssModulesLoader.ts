import { RuleSetLoader } from "webpack";

import { Environment } from "../environment";

import { cssLoaderOptions } from "./options";

export function cssModulesLoader(
  importLoaders: number,
  environment: Environment
): RuleSetLoader {
  return {
    loader: require.resolve("css-loader"),
    options: {
      ...cssLoaderOptions(importLoaders, environment),

      // Exports class names in `camelCase` style only. It's usable for code and
      // generates modules of less size.
      localsConvention: "camelCaseOnly",
      // Enables CSS modules support.
      modules: true
    }
  };
}

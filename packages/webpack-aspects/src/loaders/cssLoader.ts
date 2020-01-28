import { RuleSetLoader } from "webpack";

import { Environment } from "../environment";

import { cssLoaderOptions } from "./options";

export function cssLoader(
  importLoaders: number,
  environment: Environment
): RuleSetLoader {
  return {
    loader: require.resolve("css-loader"),
    options: cssLoaderOptions(importLoaders, environment)
  };
}

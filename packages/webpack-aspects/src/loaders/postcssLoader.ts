import { Options } from "postcss-loader";
import { RuleSetLoader } from "webpack";

import { Environment } from "../environment";

export function postcssLoader({
  isProductionBuild
}: Environment): RuleSetLoader {
  const options: Options = {
    ident: "postcss",
    sourceMap: isProductionBuild
  };

  return {
    loader: require.resolve("postcss-loader"),
    options
  };
}

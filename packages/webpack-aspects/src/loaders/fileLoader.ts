import { RuleSetRule } from "webpack";

import { Environment } from "../environment";
import { fileLoaderOptions } from "./options";

export function fileLoader(environment: Environment): RuleSetRule {
  return {
    loader: require.resolve("file-loader"),
    options: fileLoaderOptions(environment)
  };
}

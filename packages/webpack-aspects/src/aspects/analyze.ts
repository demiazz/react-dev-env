import { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import { Environment } from "../environment";
import { ensurePlugins } from "../utils";

export function analyze(
  configuration: Configuration,
  environment: Environment
) {
  if (!environment.isAnalyzeBuild) {
    return;
  }

  ensurePlugins(configuration).push(new BundleAnalyzerPlugin());
}

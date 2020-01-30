import { ensureOutput } from "../utils";
import { Configuration } from "webpack";
import { Environment } from "../environment";

export function output(
  configuration: Configuration,
  { buildDir, isDevelopmentBuild, isProductionBuild }: Environment
) {
  const fileName = isProductionBuild
    ? "static/js/[name].[contenthash:8]"
    : "static/js/[name]";

  Object.assign(ensureOutput(configuration), {
    filename: `${fileName}.js`,
    chunkFilename: `${fileName}.chunk.js`,
    path: buildDir,
    pathinfo: isDevelopmentBuild,
    publicPath: "/"
  });
}

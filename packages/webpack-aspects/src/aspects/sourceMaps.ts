import { Configuration } from "webpack";

import { Environment } from "../environment";

export function sourceMaps(
  configuration: Configuration,
  { isProductionBuild }: Environment
) {
  configuration.devtool = isProductionBuild
    ? "source-map"
    : "cheap-module-source-map";
}

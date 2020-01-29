import { Configuration } from "webpack";

import { Environment } from "../environment";

export function mode(
  configuration: Configuration,
  { isProductionBuild }: Environment
) {
  configuration.mode = isProductionBuild ? "production" : "development";
}

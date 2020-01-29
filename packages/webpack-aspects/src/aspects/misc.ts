import { Configuration } from "webpack";
import { Environment } from "../environment";

export function misc(
  configuration: Configuration,
  { isProductionBuild }: Environment
) {
  // Should stop a production build if an error happened.
  configuration.bail = isProductionBuild;
}

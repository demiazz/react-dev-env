import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";
import { Configuration } from "webpack";

import { ensurePlugins, nodeModulesPattern } from "../utils";

export function validation(configuration: Configuration) {
  ensurePlugins(configuration).push(
    // Useful for developer machines with case insensitive file system (usually
    // it's macOS).
    new CaseSensitivePathsPlugin(),
    new CircularDependencyPlugin({
      exclude: nodeModulesPattern,
      failOnError: true
    })
  );
}

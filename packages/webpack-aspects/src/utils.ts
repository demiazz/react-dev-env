import { Configuration, Plugin } from "webpack";

export const nodeModulesPattern = /[\\/]node_modules[\\/]/;

export function ensurePlugins(configuration: Configuration): Plugin[] {
  if (!configuration.plugins) {
    configuration.plugins = [];
  }

  return configuration.plugins;
}

export function checkBooleanEnvironmentVariable(variable: string): boolean {
  const value = process.env[variable];

  return value === "1" || value === "true";
}

import { Configuration, Module, Plugin } from "webpack";

export const nodeModulesPattern = /[\\/]node_modules[\\/]/;

export function ensureModule(configuration: Configuration): Module {
  if (!configuration.module) {
    configuration.module = {
      rules: []
    };
  }

  return configuration.module;
}

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

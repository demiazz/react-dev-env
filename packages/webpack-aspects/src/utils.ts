import { Tapable } from "tapable";
import {
  Configuration,
  Module,
  Options,
  Output,
  Plugin,
  RuleSetRule
} from "webpack";

export const nodeModulesPattern = /[\\/]node_modules[\\/]/;

export function ensureMinimizer(
  configuration: Configuration
): (Plugin | Tapable.Plugin)[] {
  const optimization = ensureOptimization(configuration);

  if (!optimization.minimizer) {
    optimization.minimizer = [];
  }

  return optimization.minimizer;
}

export function ensureModule(configuration: Configuration): Module {
  if (!configuration.module) {
    configuration.module = {
      rules: []
    };
  }

  return configuration.module;
}

export function ensureOutput(configuration: Configuration): Output {
  if (!configuration.output) {
    configuration.output = {};
  }

  return configuration.output;
}

export function ensureOptimization(
  configuration: Configuration
): Options.Optimization {
  if (!configuration.optimization) {
    configuration.optimization = {};
  }

  return configuration.optimization;
}

export function ensurePlugins(configuration: Configuration): Plugin[] {
  if (!configuration.plugins) {
    configuration.plugins = [];
  }

  return configuration.plugins;
}

export function ensureRules(configuration: Configuration): RuleSetRule[] {
  const module = ensureModule(configuration);

  if (!module.rules) {
    module.rules = [];
  }

  return module.rules;
}

export function checkBooleanEnvironmentVariable(variable: string): boolean {
  const value = process.env[variable];

  return value === "1" || value === "true";
}

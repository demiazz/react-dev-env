import { isAbsolute, resolve } from "path";

import { checkBooleanEnvironmentVariable } from "./utils";

export interface Environment {
  readonly rootDir: string;
  readonly cacheDir: string;

  readonly isProductionBuild: boolean;
  readonly isDevelopmentBuild: boolean;
  readonly isProfileBuild: boolean;
  readonly isCIBuild: boolean;
  readonly isAnalyzeBuild: boolean;
}

interface EnvironmentOptions {
  readonly rootDir: string;
  readonly cacheDir?: string;
}

function resolveIfRelative(rootDir: string, path: string): string {
  return isAbsolute(path) ? path : resolve(rootDir, path);
}

export async function createEnvironment(
  options: EnvironmentOptions
): Promise<Environment> {
  const nodeEnvironment = process.env.NODE_ENV;

  const rootDir = resolveIfRelative(process.cwd(), options.rootDir);
  const cacheDir = resolveIfRelative(rootDir, options.cacheDir ?? "cache");

  const isProductionBuild = nodeEnvironment === "production";
  const isDevelopmentBuild = nodeEnvironment === "development";
  const isProfileBuild =
    isProductionBuild && checkBooleanEnvironmentVariable("PROFILE");
  const isCIBuild = checkBooleanEnvironmentVariable("CI");
  const isAnalyzeBuild = checkBooleanEnvironmentVariable("ANALYZE");

  return {
    rootDir,
    cacheDir,

    isProductionBuild,
    isDevelopmentBuild,
    isProfileBuild,
    isCIBuild,
    isAnalyzeBuild
  };
}

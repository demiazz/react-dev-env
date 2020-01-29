import { isAbsolute, resolve } from "path";

import { checkBooleanEnvironmentVariable } from "./utils";

export interface Environment {
  readonly rootDir: string;

  readonly isProductionBuild: boolean;
  readonly isDevelopmentBuild: boolean;
  readonly isProfileBuild: boolean;
  readonly isCIBuild: boolean;
  readonly isAnalyzeBuild: boolean;
}

interface EnvironmentOptions {
  readonly rootDir: string;
}

export async function createEnvironment(
  options: EnvironmentOptions
): Promise<Environment> {
  const nodeEnvironment = process.env.NODE_ENV;

  const rootDir = isAbsolute(options.rootDir)
    ? options.rootDir
    : resolve(process.cwd(), options.rootDir);

  const isProductionBuild = nodeEnvironment === "production";
  const isDevelopmentBuild = nodeEnvironment === "development";
  const isProfileBuild =
    isProductionBuild && checkBooleanEnvironmentVariable("PROFILE");
  const isCIBuild = checkBooleanEnvironmentVariable("CI");
  const isAnalyzeBuild = checkBooleanEnvironmentVariable("ANALYZE");

  return {
    rootDir,

    isProductionBuild,
    isDevelopmentBuild,
    isProfileBuild,
    isCIBuild,
    isAnalyzeBuild
  };
}

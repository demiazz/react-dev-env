import { isAbsolute, resolve } from "path";

import { checkBooleanEnvironmentVariable } from "./utils";

export interface Environment {
  readonly rootDir: string;
  readonly cacheDir: string;
  readonly publicDir: string;
  readonly buildDir: string;
  readonly srcDir: string;

  readonly isProductionBuild: boolean;
  readonly isDevelopmentBuild: boolean;
  readonly isProfileBuild: boolean;
  readonly isCIBuild: boolean;
  readonly isAnalyzeBuild: boolean;

  readonly cacheDirFor: (aspect: string) => string;
}

interface EnvironmentOptions {
  readonly rootDir: string;
  readonly cacheDir?: string;
  readonly publicDir?: string;
  readonly buildDir?: string;
  readonly srcDir?: string;
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
  const publicDir = resolveIfRelative(rootDir, options.publicDir ?? "public");
  const buildDir = resolveIfRelative(rootDir, options.buildDir ?? "build");
  const srcDir = resolveIfRelative(rootDir, options.srcDir ?? "src");

  const isProductionBuild = nodeEnvironment === "production";
  const isDevelopmentBuild = nodeEnvironment === "development";
  const isProfileBuild =
    isProductionBuild && checkBooleanEnvironmentVariable("PROFILE");
  const isCIBuild = checkBooleanEnvironmentVariable("CI");
  const isAnalyzeBuild = checkBooleanEnvironmentVariable("ANALYZE");

  function cacheDirFor(aspect: string): string {
    return resolve(cacheDir, aspect);
  }

  return {
    rootDir,
    cacheDir,
    publicDir,
    buildDir,
    srcDir,

    isProductionBuild,
    isDevelopmentBuild,
    isProfileBuild,
    isCIBuild,
    isAnalyzeBuild,

    cacheDirFor
  };
}

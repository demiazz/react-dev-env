import { checkBooleanEnvironmentVariable } from "./utils";

export interface Environment {
  readonly isProductionBuild: boolean;
  readonly isDevelopmentBuild: boolean;
  readonly isProfileBuild: boolean;
  readonly isCIBuild: boolean;
  readonly isAnalyzeBuild: boolean;
}

export async function createEnvironment(): Promise<Environment> {
  const nodeEnvironment = process.env.NODE_ENV;

  const isProductionBuild = nodeEnvironment === "production";
  const isDevelopmentBuild = nodeEnvironment === "development";
  const isProfileBuild =
    isProductionBuild && checkBooleanEnvironmentVariable("PROFILE");
  const isCIBuild = checkBooleanEnvironmentVariable("CI");
  const isAnalyzeBuild = checkBooleanEnvironmentVariable("ANALYZE");

  return {
    isProductionBuild,
    isDevelopmentBuild,
    isProfileBuild,
    isCIBuild,
    isAnalyzeBuild
  };
}

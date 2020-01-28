import { Options } from "css-loader";

import { Environment } from "../environment";

export function cssLoaderOptions(
  importLoaders: number,
  { isProductionBuild }: Environment
): Options {
  return {
    esModule: true,
    // How many other loaders before this?
    importLoaders,
    sourceMap: isProductionBuild
  };
}

import { Options as CSSLoaderOptions } from "css-loader";
import { Options as FileLoaderOptions } from "file-loader";

import { Environment } from "../environment";

export function cssLoaderOptions(
  importLoaders: number,
  { isProductionBuild }: Environment
): CSSLoaderOptions {
  return {
    esModule: true,
    // How many other loaders before this?
    importLoaders,
    sourceMap: isProductionBuild
  };
}

export function fileLoaderOptions(environment: Environment): FileLoaderOptions {
  const filename = "static/media/[path][name]";

  return {
    context: environment.srcDir,
    name: environment.isProductionBuild
      ? `${filename}.[contenthash:8].[ext]`
      : `${filename}.[ext]`
  };
}

import { compilation, Compiler } from "webpack";

import { Asset } from "./types";

export function context({ options }: Compiler): string {
  return options.context ?? process.cwd();
}

export function publicPath({ options }: Compiler): string {
  return options.output?.publicPath ?? "";
}

export function writeAssets(
  assets: Asset[],
  compilation: compilation.Compilation
): void {
  for (const { filePath, source } of assets) {
    compilation.assets[filePath] = source;
  }
}

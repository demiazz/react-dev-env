import { compilation, Compiler } from "webpack";

import { Asset, HtmlPlugin } from "./types";

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

export function findHtmlPlugin(compiler: Compiler): HtmlPlugin | undefined {
  return ((compiler.options?.plugins ?? [])
    .map(({ constructor }) => constructor)
    .find(
      constructor => constructor && constructor.name === "HtmlWebpackPlugin"
    ) as unknown) as HtmlPlugin;
}

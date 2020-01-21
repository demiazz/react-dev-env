import { join } from "path";

import rimraf from "rimraf";
import { Compiler, Plugin } from "webpack";

export class CleanSourceMapsPlugin extends Plugin {
  apply(compiler: Compiler): void {
    compiler.hooks.done.tapAsync(
      "@rae/clean-source-maps-plugin",
      async (_, done) => {
        const outputDir = compiler.options.output?.path ?? "dist";
        const glob = join(outputDir, "**/*.@(js|css).map?(.br|.gz)");

        rimraf(glob, done);
      }
    );
  }
}

import { join } from "path";

import rimraf from "rimraf";
import { Compiler, Plugin } from "webpack";

export class CleanSourceMapsPlugin implements Plugin {
  public apply(compiler: Compiler): void {
    compiler.hooks.done.tapAsync(
      "@react-dev-env/clean-source-maps-plugin",
      async (_, done) => {
        const outputPath =
          compiler.options.output?.path ?? join(process.cwd(), "dist");
        const glob = join(outputPath, "**/*.@(js|css).map?(.br|.gz)");

        rimraf(glob, done);
      }
    );
  }
}

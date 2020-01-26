import validateOptions from "schema-utils";
import { Compiler, Plugin } from "webpack";

import { prepareAssetsAndManifest } from "./manifest";
import manifestOptionsSchema from "./schemas/manifestOptions.json";
import optionsSchema from "./schemas/options.json";
import { ManifestOptions } from "./types";

interface Options {
  beautify?: boolean;
}

export class WebAppManifestPlugin implements Plugin {
  public readonly manifestOptions: ManifestOptions;
  public readonly beautify: boolean;

  public constructor(manifestOptions: ManifestOptions, options: Options = {}) {
    validateOptions(manifestOptionsSchema, manifestOptions, {
      name: "WebAppManifestPlugin",
      baseDataPath: "manifest"
    });
    validateOptions(optionsSchema, options, {
      name: "WebAppManifestPlugin",
      baseDataPath: "options"
    });

    this.manifestOptions = manifestOptions;
    this.beautify = options.beautify ?? false;
  }

  public apply(compiler: Compiler): void {
    compiler.hooks.emit.tapPromise(
      "@react-dev-env/web-app-manifest-plugin",
      async compilation => {
        const { assets } = await prepareAssetsAndManifest(
          this.manifestOptions,
          {
            beautify: this.beautify,
            context: compiler.options.context ?? process.cwd(),
            publicPath: compiler.options.output?.publicPath ?? ""
          }
        );

        for (const { filePath, source } of assets) {
          compilation.assets[filePath] = source;
        }
      }
    );
  }
}

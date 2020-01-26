import validateOptions from "schema-utils";
import { Compiler, Plugin } from "webpack";

import { prepareAssetsAndManifest } from "./manifest";
import manifestOptionsSchema from "./schemas/manifestOptions.json";
import optionsSchema from "./schemas/options.json";
import { ManifestOptions } from "./types";
import {
  context,
  findHtmlPlugin,
  publicPath,
  writeAssets
} from "./webpack-utils";
import { injectToHTML } from "./html";

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
    const assetsAndManifestPromise = prepareAssetsAndManifest(
      this.manifestOptions,
      {
        beautify: this.beautify,
        context: context(compiler),
        publicPath: publicPath(compiler)
      }
    );

    compiler.hooks.make.tapPromise(
      "@react-dev-env/web-app-manifest",
      async compilation => {
        const htmlPlugin = findHtmlPlugin(compiler);

        if (!htmlPlugin) {
          return;
        }

        const { manifest } = await assetsAndManifestPromise;

        htmlPlugin
          .getHooks(compilation)
          .afterTemplateExecution.tap(
            "@react-dev-env/web-app-manifest",
            data => {
              const html = injectToHTML(data.html, manifest);

              data.html = html;
            }
          );
      }
    );

    compiler.hooks.emit.tapPromise(
      "@react-dev-env/web-app-manifest",
      async compilation => {
        const { assets } = await assetsAndManifestPromise;

        writeAssets(assets, compilation);
      }
    );
  }
}

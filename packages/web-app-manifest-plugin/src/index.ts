import validateOptions from "schema-utils";
import { Compiler, Plugin } from "webpack";

import { injectToHTML } from "./html";
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

interface Options {
  appIconFileName?: string;
  beautify?: boolean;
  favIconFileName?: string;
  manifestFileName?: string;
  screenshotFileName?: string;
}

export class WebAppManifestPlugin implements Plugin {
  private readonly manifestOptions: ManifestOptions;

  private readonly beautify: boolean;

  private readonly appIconFileName: string;
  private readonly favIconFileName: string;
  private readonly manifestFileName: string;
  private readonly screenshotFileName: string;

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

    this.appIconFileName =
      options.appIconFileName ?? "web-application/icons/icon-[hash].[ext]";
    this.favIconFileName =
      options.favIconFileName ?? "web-application/favicon-[hash].[ext]";
    this.manifestFileName =
      options.manifestFileName ?? "web-application/manifest-[hash].[ext]";
    this.screenshotFileName =
      options.screenshotFileName ??
      "web-application/screenshots/screenshot-[hash].[ext]";
  }

  public apply(compiler: Compiler): void {
    const assetsAndManifestPromise = prepareAssetsAndManifest(
      this.manifestOptions,
      {
        appIconFileName: this.appIconFileName,
        beautify: this.beautify,
        context: context(compiler),
        favIconFileName: this.favIconFileName,
        manifestFileName: this.manifestFileName,
        publicPath: publicPath(compiler),
        screenshotFileName: this.screenshotFileName
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

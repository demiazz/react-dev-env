import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import TreatPlugin from "treat/webpack-plugin";
import { Configuration } from "webpack";

import { Environment } from "../environment";
import {
  cssLoader,
  cssModulesLoader,
  postcssLoader,
  styleLoader
} from "../loaders";
import { ensurePlugins, ensureRules } from "../utils";

const cssPattern = /\.p?css$/;
const cssModulesPattern = /\.module\.p?css$/;

export function styles(configuration: Configuration, environment: Environment) {
  // Use CSS extraction only in production build for better performance.
  const useCSSExtraction = environment.isProductionBuild;

  const environmentBoundedStyleLoader = useCSSExtraction
    ? MiniCSSExtractPlugin.loader
    : styleLoader();

  const plugins = ensurePlugins(configuration);
  const rules = ensureRules(configuration);

  rules.push({
    test: cssPattern,
    exclude: cssModulesPattern,
    use: [
      environmentBoundedStyleLoader,
      cssLoader(1, environment),
      postcssLoader(environment)
    ],
    sideEffects: true
  });

  rules.push({
    test: cssModulesPattern,
    use: [
      environmentBoundedStyleLoader,
      cssModulesLoader(1, environment),
      postcssLoader(environment)
    ]
  });

  // Configure `treat` package. This is CSS-in-JS solution with minimalistic (
  // near to zero) runtime. Learn more: https://seek-oss.github.io/treat/
  plugins.push(
    new TreatPlugin({
      outputLoaders: [environmentBoundedStyleLoader]
    })
  );

  if (useCSSExtraction) {
    plugins.push(
      new MiniCSSExtractPlugin({
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        filename: "static/css/[name].[contenthash:8].css"
      })
    );
  }
}

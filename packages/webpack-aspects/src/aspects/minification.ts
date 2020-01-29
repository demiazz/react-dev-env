import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { Configuration } from "webpack";

import { Environment } from "../environment";
import { ensureMinimizer, ensureOptimization } from "../utils";

export function minification(
  configuration: Configuration,
  { cacheDirFor, isProductionBuild, isProfileBuild }: Environment
) {
  if (!isProductionBuild) {
    return;
  }

  ensureOptimization(configuration).minimize = true;

  ensureMinimizer(configuration).push(
    new TerserPlugin({
      cache: cacheDirFor("terser"),
      extractComments: true,
      parallel: true,
      sourceMap: true,
      terserOptions: {
        compress: {
          // This option can transform ES5 code the ES6+ code.
          ecma: 5,
          // Breaks a valid code. Learn more:
          // - https://github.com/facebook/create-react-app/issues/5250
          // - https://github.com/terser-js/terser/issues/120
          inline: 2,
          warnings: false
        },
        // Needed for profiling development tools.
        keep_classnames: isProfileBuild,
        keep_fnames: isProfileBuild,
        mangle: {
          safari10: true
        },
        output: {
          ascii_only: true,
          comments: false,
          // This option doesn't downgrade ES6+ code to the ES5 code.
          ecma: 5
        },
        parse: {
          ecma: 8
        }
      }
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        map: isProductionBuild
          ? {
              annotation: true,
              inline: false
            }
          : false
      }
    })
  );
}

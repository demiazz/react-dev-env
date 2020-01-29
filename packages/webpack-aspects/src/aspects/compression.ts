import zopfli from "@gfx/zopfli";
import CompressionPlugin from "compression-webpack-plugin";
import { Configuration } from "webpack";

import { Environment } from "../environment";
import { ensurePlugins } from "../utils";

export function compression(
  configuration: Configuration,
  { cacheDirFor, isProductionBuild }: Environment
) {
  if (!isProductionBuild) {
    return;
  }

  const plugins = ensurePlugins(configuration);

  plugins.push(
    // Use `zopfli` instead of classic `gzip` for better compression.
    new CompressionPlugin({
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(
          input,
          compressionOptions,
          (error: Error | null, data: Uint8Array) => {
            callback(error, Buffer.from(data));
          }
        );
      },
      cache: cacheDirFor("zopfli"),
      compressionOptions: {
        numiterations: 15
      }
    })
  );

  if ("brotli" in process.versions) {
    plugins.push(
      new CompressionPlugin({
        algorithm: "brotliCompress",
        cache: cacheDirFor("brotli"),
        filename: "[path].br[query]"
      })
    );
  }
}

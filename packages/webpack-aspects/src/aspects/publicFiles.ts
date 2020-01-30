import CopyPlugin from "copy-webpack-plugin";
import { Configuration } from "webpack";

import { ensurePlugins } from "../utils";
import { Environment } from "../environment";

export function publicFiles(
  configuration: Configuration,
  { publicDir }: Environment
) {
  ensurePlugins(configuration).push(new CopyPlugin([publicDir]));
}

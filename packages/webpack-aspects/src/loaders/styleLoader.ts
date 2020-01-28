import { Options } from "style-loader";

import { RuleSetLoader } from "webpack";

export function styleLoader(): RuleSetLoader {
  const options: Options = {
    esModule: true
  };

  return {
    loader: require.resolve("style-loader"),
    options
  };
}

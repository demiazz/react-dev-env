declare module "treat/webpack-plugin" {
  import { Theme } from "treat/theme";
  import { Plugin, RuleSetCondition, RuleSetUse } from "webpack";

  type ThemeIdentNameFn = (theme: Theme) => string;

  interface Options {
    browsers?: string | ReadonlyArray<string>;
    localIdentName?: string;
    minify?: boolean;
    outputCSS?: boolean;
    outputLoaders?: RuleSetUse;
    test?: RuleSetCondition;
    themeIdentName?: string | ThemeIdentNameFn;
  }

  interface TreatPlugin extends Plugin {
    new (options: Options): TreatPlugin;
  }

  declare const Constructor: TreatPlugin;

  export = Constructor;
}

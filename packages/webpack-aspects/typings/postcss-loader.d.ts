declare module "postcss-loader" {
  import { AcceptedPlugin, Stringifier, Parser, Syntax } from "postcss";

  interface Config {
    context?: Context;
    options?: ConfigOptions;
  }

  interface Context {
    env: string;
    file: {
      basename: string;
      dirname: string;
      extname: string;
    };
    options: ContextOptions;
  }

  interface ContextOptions {
    [name: string]: unknown;
  }

  export interface Options {
    config?: Config;
    exec?: boolean;
    ident?: string;
    parser?: string | Parser;
    plugins?: AcceptedPlugin[];
    sourceMap?: boolean | "inline";
    stringifier?: string | Stringifier;
    syntax?: string | Syntax;
  }
}

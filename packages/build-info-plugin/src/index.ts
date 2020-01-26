import { JSONSource } from "@react-dev-env/utils";
import { Compiler, Plugin } from "webpack";

type BuildInfoPrimitive = string | number | boolean;
type BuildInfoObject = {
  [property: string]: BuildInfo;
};
type BuildInfoArray = BuildInfo[];
type BuildInfo = BuildInfoPrimitive | BuildInfoObject | BuildInfoArray;

interface Options {
  beautify?: boolean;
  buildInfo?: BuildInfo;
  fileName?: string;
}

export class BuildInfoPlugin implements Plugin {
  private readonly beautify: boolean;
  private readonly buildInfo: BuildInfo;
  private readonly fileName: string;

  public constructor({
    beautify = false,
    buildInfo = {},
    fileName = "build-info.json"
  }: Options = {}) {
    this.beautify = beautify;
    this.fileName = fileName;
    this.buildInfo = buildInfo;
  }

  public apply(compiler: Compiler): void {
    compiler.hooks.emit.tap("@react-dev-env/build-info", compilation => {
      compilation.assets[this.fileName] = new JSONSource(
        this.buildInfo,
        this.beautify
      );
    });
  }
}

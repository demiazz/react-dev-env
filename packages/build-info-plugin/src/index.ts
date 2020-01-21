import { Compiler, Plugin } from "webpack";
import { RawSource } from "webpack-sources";

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

  constructor({
    beautify = false,
    buildInfo = {},
    fileName = "build-info.json"
  }: Options = {}) {
    this.beautify = beautify;
    this.fileName = fileName;
    this.buildInfo = buildInfo;
  }

  apply(compiler: Compiler): void {
    compiler.hooks.emit.tap("build-info", compilation => {
      compilation.assets[this.fileName] = this.createAsset();
    });
  }

  private createAsset() {
    const json = JSON.stringify(this.buildInfo, null, this.beautify ? 2 : 0);

    return new RawSource(json);
  }
}

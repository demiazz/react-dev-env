import validateManifest from "schema-utils";
import { Compiler, Plugin } from "webpack";

import manifestSchema from "../schemas/manifest.json";

import { Manifest } from "./types";

interface Options {
  beautify?: boolean;
  fileName?: string;
}

export class WebAppManifestPlugin implements Plugin {
  public readonly manifest: Manifest;
  public readonly beautify: boolean;
  public readonly fileName: string;

  public constructor(
    manifest: Manifest,
    { beautify = false, fileName = "manifest.json" }: Options = {}
  ) {
    validateManifest(manifestSchema, manifest, {
      name: "WebAppManifestPlugin",
      baseDataPath: "manifest"
    });

    this.manifest = manifest;
    this.beautify = beautify;
    this.fileName = fileName;
  }

  public apply(_compiler: Compiler): void {}
}

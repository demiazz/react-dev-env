import { RawSource } from "webpack-sources";

import { JSONValue } from "./types";

export class JSONSource extends RawSource {
  public constructor(value: JSONValue, beautify = false) {
    const source = JSON.stringify(value, null, beautify ? 2 : 0);

    super(source);
  }
}

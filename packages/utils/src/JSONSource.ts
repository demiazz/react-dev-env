import { RawSource } from "webpack-sources";

type JSONPrimitive = string | number | boolean | null;

type JSONObject = {
  [property: string]: JSONValue;
};

type JSONArray = JSONValue[];

type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export class JSONSource extends RawSource {
  public constructor(value: JSONValue, beautify = false) {
    const source = JSON.stringify(value, null, beautify ? 2 : 0);

    super(source);
  }
}

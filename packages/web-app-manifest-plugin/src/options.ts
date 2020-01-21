import { Dir, Display, Orientation } from "./enums";

export interface RawOptions {
  backgroundColor?: string;
  categories?: string[];
  description?: string;
  dir?: string;
  display?: string;
  iarcRatingId?: string;
  lang?: string;
  name: string;
  orientation?: string;
  preferRelatedApplication?: boolean;
  scope?: string;
  shortName?: string;
  startUrl?: string;
  themeColor?: string;
}

export interface Options extends RawOptions {
  dir?: Dir;
  display?: Display;
  name: string;
  orientation?: Orientation;
}

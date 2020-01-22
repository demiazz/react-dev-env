import { Dir, Display, Orientation, Platform } from "./enums";

export interface Image {
  src: string;
  sizes?: string;
  type?: string;
  purpose?: string;
  platform?: string;
}

export interface FingerPrint {
  type: string;
  value: string;
}

export interface RelatedApplication {
  platform: Platform;
  url?: string;
  id?: string;
  min_version?: string;
  fingerprints?: FingerPrint[];
}

export interface Manifest {
  background_color?: string;
  categories?: string[];
  description?: string;
  dir?: Dir;
  display?: Display;
  iarc_rating_id?: string;
  icons: Image[];
  lang?: string;
  name: string;
  orientation?: Orientation;
  prefer_related_applications?: boolean;
  related_applications?: RelatedApplication[];
  scope?: string;
  screenshots?: Image[];
  short_name?: string;
  start_url?: string;
  theme_color?: string;
}

export type Dir = "auto" | "ltr" | "rtl";

export type Display = "fullscreen" | "standalone" | "minimal-ui" | "browser";

export type Orientation =
  | "any"
  | "natural"
  | "landscape"
  | "portrait"
  | "portrait-primary"
  | "portrait-secondary"
  | "landscape-primary"
  | "landscape-secondary";

export type Platform = "play" | "itunes" | "windows";

export interface FingerPrint {
  type: string;
  value: string;
}

export interface Image {
  src: string;
  sizes?: string;
  type?: string;
  purpose?: string;
  platform?: string;
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

export interface RelatedApplicationOptions {
  platform: Platform;
  url?: string;
  id?: string;
  minVersion?: string;
  fingerprints?: FingerPrint[];
}

export interface Options {
  backgroundColor?: string;
  categories?: string[];
  description?: string;
  dir?: Dir;
  display?: Display;
  iarcRatingId?: string;
  lang?: string;
  name: string;
  orientation?: Orientation;
  preferRelatedApplication?: boolean;
  relatedApplications?: RelatedApplicationOptions[];
  scope?: string;
  shortName?: string;
  startUrl?: string;
  themeColor?: string;
}

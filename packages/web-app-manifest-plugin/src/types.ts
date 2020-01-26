import { Source } from "webpack-sources";

export interface Asset {
  filePath: string;
  source: Source;
}

export type Dir = "auto" | "ltr" | "rtl";

export type Display = "fullscreen" | "standalone" | "minimal-ui" | "browser";

export interface ExtendedImageResource extends ImageResource {
  appleTouchIcon?: boolean;
}

export interface ExternalApplicationResource {
  platform: Platform;
  url?: string;
  id?: string;
  min_version?: string;
  fingerprints?: FingerPrint[];
}

export interface Image {
  appleTouchIcon?: boolean;
  filePath: string;
  platform?: Platform;
  purpose?: Purpose;
}

export interface ImageResource {
  platform?: string;
  purpose?: string;
  sizes?: string;
  src: string;
  type?: string;
}

export interface FingerPrint {
  type: string;
  value: string;
}

export interface Manifest
  extends Omit<ManifestOptions, "appIcons" | "favIcon" | "screenshots"> {
  appIcons?: ExtendedImageResource[];
  favIcon: Pick<ExtendedImageResource, "src" | "sizes" | "type">;
  src: string;
  screenshots?: Omit<ExtendedImageResource, "appleTouchIcon">[];
}

export interface ManifestOptions {
  appIcons?: Image[];
  backgroundColor?: string;
  categories?: string[];
  description?: string;
  dir?: Dir;
  display?: Display;
  favIcon: string;
  iarcRatingId?: string;
  lang?: string;
  name: string;
  orientation?: Orientation;
  preferRelatedApplication?: boolean;
  relatedApplications?: RelatedApplication[];
  scope?: string;
  screenshots?: Image[];
  shortName?: string;
  startUrl?: string;
  themeColor?: string;
}

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

export type Purpose = "any" | "badge" | "maskable" | ("badge" | "maskable")[];

export interface RelatedApplication {
  platform: Platform;
  url?: string;
  id?: string;
  minVersion?: string;
  fingerprints?: FingerPrint[];
}

export interface WebAppManifest {
  background_color?: string;
  categories?: string[];
  description?: string;
  dir?: Dir;
  display?: Display;
  iarc_rating_id?: string;
  icons: ImageResource[];
  lang?: string;
  name: string;
  orientation?: Orientation;
  prefer_related_applications?: boolean;
  related_applications?: ExternalApplicationResource[];
  scope?: string;
  screenshots?: ImageResource[];
  short_name?: string;
  start_url?: string;
  theme_color?: string;
}

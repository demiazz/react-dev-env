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

export interface WebAppManifestImage {
  src: string;
  sizes?: string;
  type?: string;
  purpose?: string;
  platform?: string;
}

export interface WebAppManifestRelatedApplication {
  platform: Platform;
  url?: string;
  id?: string;
  min_version?: string;
  fingerprints?: FingerPrint[];
}

export interface WebAppManifest {
  background_color?: string;
  categories?: string[];
  description?: string;
  dir?: Dir;
  display?: Display;
  iarc_rating_id?: string;
  icons: WebAppManifestImage[];
  lang?: string;
  name: string;
  orientation?: Orientation;
  prefer_related_applications?: boolean;
  related_applications?: WebAppManifestRelatedApplication[];
  scope?: string;
  screenshots?: WebAppManifestImage[];
  short_name?: string;
  start_url?: string;
  theme_color?: string;
}

export interface RelatedApplication {
  platform: Platform;
  url?: string;
  id?: string;
  minVersion?: string;
  fingerprints?: FingerPrint[];
}

interface FavIcon {
  fileName: string;
  sizes: number | number[];
}

interface AppIcon {
  fileName: string;
  size: number;
  appleTouchIcon?: boolean;
}

interface Screenshot extends AppIcon {}

export interface Manifest {
  appIcons?: AppIcon[];
  backgroundColor?: string;
  categories?: string[];
  description?: string;
  dir?: Dir;
  display?: Display;
  favIcon: FavIcon;
  iarcRatingId?: string;
  lang?: string;
  name: string;
  orientation?: Orientation;
  preferRelatedApplication?: boolean;
  relatedApplications?: RelatedApplication[];
  scope?: string;
  screenshots?: Screenshot[];
  shortName?: string;
  startUrl?: string;
  themeColor?: string;
}

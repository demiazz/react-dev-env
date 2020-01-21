export type Dir = "auto" | "ltr" | "rtl";

export const possibleDirValues: Dir[] = ["auto", "ltr", "rtl"];

export const isDir = (value: any): value is Dir =>
  possibleDirValues.includes(value as any);

export type Display = "fullscreen" | "standalone" | "minimal-ui" | "browser";

export const possibleDisplayValues: Display[] = [
  "fullscreen",
  "standalone",
  "minimal-ui",
  "browser"
];

export const isDisplay = (value: any): value is Display =>
  possibleDisplayValues.includes(value);

export type Orientation =
  | "any"
  | "natural"
  | "landscape"
  | "portrait"
  | "portrait-primary"
  | "portrait-secondary"
  | "landscape-primary"
  | "landscape-secondary";

export const possibleOrientationValues: Orientation[] = [
  "any",
  "natural",
  "landscape",
  "portrait",
  "portrait-primary",
  "portrait-secondary",
  "landscape-primary",
  "landscape-secondary"
];

export const isOrientation = (value: any): value is Orientation =>
  possibleOrientationValues.includes(value);

export type Platform = "chrome_web_store" | "play" | "itunes" | "windows";

const platformRegExp = /^(chrome_web_store|play|itunes|windows)$/;

export const isPlatform = (value: string): value is Platform =>
  platformRegExp.test(value);

export type ImagePurpose = "any" | "badge" | "maskable";

const imagePurposeRegExp = /^(any|badge|maskable)$/;

export const isImagePurpose = (value: string): value is ImagePurpose =>
  imagePurposeRegExp.test(value);

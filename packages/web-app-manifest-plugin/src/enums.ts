export type Dir = "auto" | "ltr" | "rtl";

const dirRegExp = /^(auto|ltr|rtl)$/;

export const isDir = (value: string): value is Dir => dirRegExp.test(value);

export type Display = "fullscreen" | "standalone" | "minimal-ui" | "browser";

const displayRegExp = /^(fullscreen|standalone|minimal-ui|browser)$/;

export const isDisplay = (value: string): value is Display =>
  displayRegExp.test(value);

export type Orientation =
  | "any"
  | "natural"
  | "landscape"
  | "portrait"
  | "portrait-primary"
  | "portrait-secondary"
  | "landscape-primary"
  | "landscape-secondary";

const orientationRegExp = /^(any|natural|landscape|(portrait|landscape)(-(primary|secondary))?)$/;

export const isOrientation = (value: string): value is Orientation =>
  orientationRegExp.test(value);

export type Platform = "chrome_web_store" | "play" | "itunes" | "windows";

const platformRegExp = /^(chrome_web_store|play|itunes|windows)$/;

export const isPlatform = (value: string): value is Platform =>
  platformRegExp.test(value);

export type ImagePurpose = "any" | "badge" | "maskable";

const imagePurposeRegExp = /^(any|badge|maskable)$/;

export const isImagePurpose = (value: string): value is ImagePurpose =>
  imagePurposeRegExp.test(value);

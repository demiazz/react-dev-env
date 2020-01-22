import { readFile } from "fs";
import { isAbsolute, resolve } from "path";
import { promisify } from "util";
import { RawSource } from "webpack-sources";

import { FavIcon, AppIcon, Screenshot } from "./types";

type Image = AppIcon | FavIcon | Screenshot;

export function normalizeImage(
  image: AppIcon | FavIcon | Screenshot,
  context: string
) {
  if (isAbsolute(image.fileName)) {
    return;
  }

  image.fileName = resolve(context, image.fileName);
}

export function normalizeImages(
  images: (AppIcon | FavIcon | Screenshot)[],
  context: string
) {
  return images.forEach(image => normalizeImage(image, context));
}

export async function readImageSource({ fileName }: Image): Promise<RawSource> {
  const content = await promisify(readFile)(fileName);

  // `RawSource` typings takes only string argument.
  // But it can takes `Buffer` too.
  return new RawSource((content as unknown) as string);
}

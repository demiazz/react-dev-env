import { createHash } from "crypto";
import { readFile as readFileWithCallback } from "fs";
import { imageSize } from "image-size";
import { lookup } from "mime-types";
import { extname, isAbsolute, join, resolve } from "path";
import { promisify } from "util";
import { RawSource } from "webpack-sources";

import { Asset, Image, ExtendedImageResource, Purpose } from "./types";

interface Dimensions {
  height?: number;
  width?: number;
}

interface ExtendedImageResourceMeta
  extends Omit<ExtendedImageResource, "src" | "sizes"> {}

interface ImageMeta extends Omit<Image, "filePath"> {}

interface ReadedImage {
  asset: Asset;
  resources: ExtendedImageResource[];
}

interface ResolvedImages {
  [filePath: string]: ExtendedImageResourceMeta[];
}

function resolveFilePath(filePath: string, context: string): string {
  return isAbsolute(filePath) ? filePath : resolve(context, filePath);
}

function serializePurpose(purpose?: Purpose): string | undefined {
  if (!purpose) {
    return undefined;
  }

  if (Array.isArray(purpose)) {
    return purpose.join(" ");
  } else {
    return purpose;
  }
}

function toImageResourceMeta({
  purpose,
  ...meta
}: ImageMeta): ExtendedImageResourceMeta {
  return { ...meta, purpose: serializePurpose(purpose) };
}

function resolveImage(
  { filePath, ...meta }: Image,
  resolvedImages: ResolvedImages,
  context: string
) {
  const resolvedFilePath = resolveFilePath(filePath, context);

  if (!resolvedImages[resolvedFilePath]) {
    resolvedImages[resolvedFilePath] = [];
  }

  resolvedImages[resolvedFilePath].push(toImageResourceMeta(meta));
}

function squashMetas(
  metas: ExtendedImageResourceMeta[]
): ExtendedImageResourceMeta[] {
  const hits: Record<string, ExtendedImageResourceMeta> = {};

  for (const meta of metas) {
    const hit = `${meta.platform}:${meta.purpose}`;
    const existing = hits[hit];

    if (existing) {
      hits[hit].appleTouchIcon = existing.appleTouchIcon || meta.appleTouchIcon;
    } else {
      hits[hit] = meta;
    }
  }

  return Object.values(hits);
}

function resolveImages(images: Image[], context: string): ResolvedImages {
  const resolvedImages: ResolvedImages = {};

  for (const image of images) {
    resolveImage(image, resolvedImages, context);
  }

  for (const filePath of Object.keys(resolvedImages)) {
    resolvedImages[filePath] = squashMetas(resolvedImages[filePath]);
  }

  return resolvedImages;
}

function calculateHash(data: Buffer): string {
  return createHash("md5")
    .update(data)
    .digest("hex")
    .slice(0, 8);
}

function serializeDimensions(dimensions: Dimensions): string | undefined {
  const width = dimensions.width;
  const height = dimensions.height;

  return height != null && width != null ? `${width}x${height}` : undefined;
}

function lookupImageSizes(buffer: Buffer): string | undefined {
  const sizes = imageSize(buffer);
  const tokens: (string | undefined)[] = [];

  if (sizes.images) {
    for (const dimensions of sizes.images) {
      tokens.push(serializeDimensions(dimensions));
    }
  } else {
    tokens.push(serializeDimensions(sizes));
  }

  return tokens.filter(Boolean).join(" ");
}

function lookupImageType(fileName: string): string | undefined {
  const mimeType = lookup(fileName);

  return mimeType === false ? undefined : mimeType;
}

async function readImage(
  filePath: string,
  metas: ExtendedImageResourceMeta[],
  {
    fileName,
    publicPath
  }: {
    fileName: string;
    publicPath: string;
  }
): Promise<ReadedImage> {
  const data = await promisify(readFileWithCallback)(filePath);

  const assetPath = `${fileName}-${calculateHash(data)}${extname(filePath)}`;
  const source = new RawSource((data as unknown) as string);

  const src = join(publicPath, assetPath);
  const sizes = lookupImageSizes(data);
  const type = lookupImageType(filePath);

  const asset = { filePath: assetPath, source };
  const resources = metas.map(meta => ({
    ...meta,

    src,
    sizes,
    type
  }));

  return {
    asset,
    resources
  };
}

function readImages(
  resolvedImages: ResolvedImages,
  options: {
    fileName: string;
    publicPath: string;
  }
): Promise<ReadedImage[]> {
  const promises = [];

  for (const filePath of Object.keys(resolvedImages)) {
    const metas = resolvedImages[filePath];

    promises.push(readImage(filePath, metas, options));
  }

  return Promise.all(promises);
}

export async function readAssetsAndResources(
  images: Image[],
  options: {
    context: string;
    publicPath: string;
    fileName: string;
  }
): Promise<{
  assets: Asset[];
  resources: ExtendedImageResource[];
}> {
  const resolvedImages = resolveImages(images, options.context);
  const readedImages = await readImages(resolvedImages, options);

  const assets = [];
  const resources = [];

  for (const image of readedImages) {
    assets.push(image.asset);
    resources.push(...image.resources);
  }

  return { assets, resources };
}

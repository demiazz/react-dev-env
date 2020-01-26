import { join } from "path";
import { JSONSource, JSONValue } from "@react-dev-env/utils";

import { readAssetsAndResources } from "./images";
import {
  Asset,
  ExtendedImageResource,
  ExternalApplicationResource,
  ImageResource,
  Manifest,
  ManifestOptions,
  RelatedApplication,
  WebAppManifest
} from "./types";
import { calculateHash, interpolateFileName } from "./utils";

function serializeExtendedImageResource({
  appleTouchIcon,
  ...resource
}: ExtendedImageResource): ImageResource {
  return resource;
}

function serializeRelatedApplication({
  minVersion,
  ...application
}: RelatedApplication): ExternalApplicationResource {
  return {
    ...application,

    min_version: minVersion
  };
}

function serializeManifest({
  appIcons,
  backgroundColor,
  favIcon,
  iarcRatingId,
  preferRelatedApplication,
  relatedApplications,
  screenshots,
  shortName,
  startUrl,
  themeColor,
  ...manifestProperties
}: Omit<Manifest, "src">): WebAppManifest {
  const icons = [serializeExtendedImageResource(favIcon)];

  if (appIcons && appIcons.length > 0) {
    icons.push(...appIcons.map(serializeExtendedImageResource));
  }

  const webAppManifest: WebAppManifest = {
    ...manifestProperties,

    background_color: backgroundColor,
    iarc_rating_id: iarcRatingId,
    prefer_related_applications: preferRelatedApplication,
    short_name: shortName,
    start_url: startUrl,
    theme_color: themeColor,

    icons
  };

  if (relatedApplications && relatedApplications.length > 0) {
    webAppManifest.related_applications = relatedApplications.map(
      serializeRelatedApplication
    );
  }

  if (screenshots && screenshots.length > 0) {
    webAppManifest.screenshots = screenshots;
  }

  return webAppManifest;
}

function manifestToAsset(
  manifest: Omit<Manifest, "src">,
  { beautify, fileName }: { beautify: boolean; fileName: string }
): Asset {
  const source = new JSONSource(
    (serializeManifest(manifest) as unknown) as JSONValue,
    beautify
  );
  const hash = calculateHash(source.source());

  return {
    filePath: interpolateFileName(fileName, hash, "json"),
    source
  };
}

export async function prepareAssetsAndManifest(
  { appIcons, favIcon, screenshots, ...manifestProperties }: ManifestOptions,
  {
    appIconFileName,
    beautify,
    favIconFileName,
    manifestFileName,
    screenshotFileName,
    ...options
  }: {
    appIconFileName: string;
    beautify: boolean;
    context: string;
    favIconFileName: string;
    manifestFileName: string;
    publicPath: string;
    screenshotFileName: string;
  }
): Promise<{ assets: Asset[]; manifest: Manifest }> {
  const assets: Asset[] = [];

  const {
    assets: [favIconAsset],
    resources: [favIconResource]
  } = await readAssetsAndResources([{ filePath: favIcon }], {
    ...options,
    fileName: favIconFileName
  });

  assets.push(favIconAsset);

  const manifest: Omit<Manifest, "src"> = {
    ...manifestProperties,

    favIcon: favIconResource
  };

  if (appIcons && appIcons.length > 0) {
    const {
      assets: appIconsAssets,
      resources: appIconsResources
    } = await readAssetsAndResources(appIcons, {
      ...options,
      fileName: appIconFileName
    });

    assets.push(...appIconsAssets);
    manifest.appIcons = appIconsResources;
  } else {
    manifest.appIcons = undefined;
  }

  if (screenshots && screenshots.length > 0) {
    const {
      assets: screenshotsAssets,
      resources: screenshotsResources
    } = await readAssetsAndResources(screenshots, {
      ...options,
      fileName: screenshotFileName
    });

    assets.push(...screenshotsAssets);
    manifest.screenshots = screenshotsResources;
  } else {
    manifest.screenshots = undefined;
  }

  const manifestAsset = manifestToAsset(manifest, {
    beautify,
    fileName: manifestFileName
  });
  const manifestSrc = join(options.publicPath, manifestAsset.filePath);

  assets.push(manifestAsset);

  return { assets, manifest: { ...manifest, src: manifestSrc } };
}

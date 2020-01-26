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
}: Manifest): WebAppManifest {
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

export async function prepareAssetsAndManifest(
  { appIcons, favIcon, screenshots, ...manifestProperties }: ManifestOptions,
  options: {
    beautify: boolean;
    context: string;
    publicPath: string;
  }
): Promise<{ assets: Asset[]; manifest: Manifest }> {
  const assets: Asset[] = [];

  const {
    assets: [favIconAsset],
    resources: [favIconResource]
  } = await readAssetsAndResources([{ filePath: favIcon }], {
    ...options,
    fileName: "favicon"
  });

  assets.push(favIconAsset);

  const manifest: Manifest = {
    ...manifestProperties,

    favIcon: favIconResource
  };

  if (appIcons && appIcons.length > 0) {
    const {
      assets: appIconsAssets,
      resources: appIconsResources
    } = await readAssetsAndResources(appIcons, {
      ...options,
      fileName: "web-application/app-icons/app-icon"
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
      fileName: "web-application/screenshots/screenshot"
    });

    assets.push(...screenshotsAssets);
    manifest.screenshots = screenshotsResources;
  } else {
    manifest.screenshots = undefined;
  }

  assets.push({
    filePath: "web-application/manifest.json",
    source: new JSONSource(
      (serializeManifest(manifest) as unknown) as JSONValue,
      options.beautify
    )
  });

  return { assets, manifest };
}

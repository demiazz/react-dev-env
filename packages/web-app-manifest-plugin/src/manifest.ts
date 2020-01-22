import {
  WebAppManifestRelatedApplication,
  RelatedApplication,
  Manifest,
  WebAppManifest
} from "./types";
import { normalizeImage, normalizeImages } from "./images";

export function normalizeManifest(manifest: Manifest, context: string) {
  normalizeImage(manifest.favIcon, context);

  if (manifest.appIcons) {
    normalizeImages(manifest.appIcons, context);
  }

  if (manifest.screenshots) {
    normalizeImages(manifest.screenshots, context);
  }
}

function serializeRelatedApplication({
  minVersion,
  ...relatedApplication
}: RelatedApplication): WebAppManifestRelatedApplication {
  return {
    min_version: minVersion,

    ...relatedApplication
  };
}

export function serializeManifest({
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
  ...manifest
}: Manifest): WebAppManifest {
  return {
    background_color: backgroundColor,
    iarc_rating_id: iarcRatingId,
    prefer_related_applications: preferRelatedApplication,
    related_applications: relatedApplications
      ? relatedApplications.map(serializeRelatedApplication)
      : undefined,
    short_name: shortName,
    start_url: startUrl,
    theme_color: themeColor,

    icons: [],

    ...manifest
  };
}

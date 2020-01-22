import {
  WebAppManifestRelatedApplication,
  RelatedApplication,
  Manifest,
  WebAppManifest
} from "./types";

const serializeRelatedApplication = ({
  minVersion,
  ...relatedApplication
}: RelatedApplication): WebAppManifestRelatedApplication => ({
  min_version: minVersion,

  ...relatedApplication
});

export const serializeManifest = ({
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
}: Manifest): WebAppManifest => ({
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
});

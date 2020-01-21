import {
  isDir,
  isDisplay,
  isOrientation,
  possibleDirValues,
  possibleDisplayValues,
  possibleOrientationValues
} from "./enums";
import { RawOptions, Options } from "./options";

export const validateOptions = (
  options: RawOptions
): asserts options is Options => {
  const { dir, display, orientation } = options;

  if (dir != null && !isDir(dir)) {
    throw new Error(
      `The "dir" value must be one of ${JSON.stringify(possibleDirValues)}.` +
        `But was given ${JSON.stringify(dir)}.`
    );
  }

  if (display != null && !isDisplay(display)) {
    throw new Error(
      `The "display" value must be one ` +
        `of ${JSON.stringify(possibleDisplayValues)}.` +
        `But was given ${JSON.stringify(display)}.`
    );
  }

  if (orientation != null && !isOrientation(orientation)) {
    throw new Error(
      `The "orientation" value must be one ` +
        `of ${JSON.stringify(possibleOrientationValues)}.` +
        `But was given ${JSON.stringify(orientation)}.`
    );
  }

  return;
};

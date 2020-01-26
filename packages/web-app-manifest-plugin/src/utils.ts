import { readFile as readFileWithCallback } from "fs";
import { promisify } from "util";

export const readFile = promisify(readFileWithCallback);

export function generateFilePath(
  pattern: string,
  {
    ext,
    hash,
    name
  }: {
    ext: string;
    hash: string;
    name: string;
  }
): string {
  return pattern
    .replace("[name]", name)
    .replace("[hash]", hash)
    .replace("[ext]", ext);
}

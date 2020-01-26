import { createHash } from "crypto";
import { readFile as readFileWithCallback } from "fs";
import { promisify } from "util";

export const readFile = promisify(readFileWithCallback);

export function calculateHash(data: Buffer | string): string {
  return createHash("md5")
    .update(data)
    .digest("hex")
    .slice(0, 8);
}

export function interpolateFileName(
  pattern: string,
  hash: string,
  ext: string
): string {
  return pattern.replace("[hash]", hash).replace("[ext]", ext);
}

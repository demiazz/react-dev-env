import { readFile as readFileWithCallback } from "fs";
import { promisify } from "util";

export const readFile = promisify(readFileWithCallback);

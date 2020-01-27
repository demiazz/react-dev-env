import { exec as execWithCallback } from "child_process";
import { promisify } from "util";

const exec = promisify(execWithCallback);

async function command(cmd: string): Promise<string> {
  const result = await exec(cmd, { cwd: __dirname });

  return result.stdout.split("\n").join("");
}

export function branch(): Promise<string> {
  return command("git rev-parse --abbrev-ref HEAD");
}

export function revision(): Promise<string> {
  return command("git rev-parse HEAD");
}

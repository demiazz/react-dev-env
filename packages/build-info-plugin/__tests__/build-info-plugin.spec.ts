import { readFile, rmdir } from "fs";
import { join, resolve } from "path";
import webpack, { Configuration } from "webpack";

import { BuildInfoPluginOptions, BuildInfoPlugin } from "../src";

const fixturesDir = resolve(__dirname, "fixtures");
const entryPath = join(fixturesDir, "index.js");
const buildDir = join(fixturesDir, "build");

function build(options?: BuildInfoPluginOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const configuration: Configuration = {
      context: fixturesDir,

      entry: entryPath,

      output: {
        path: buildDir
      },

      plugins: [new BuildInfoPlugin(options)]
    };

    webpack(configuration, (error, stats) => {
      if (error != null || stats.hasErrors()) {
        reject();
      }

      resolve();
    });
  });
}

function readBuildInfo(options?: BuildInfoPluginOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const buildInfoPath = join(
      buildDir,
      options?.fileName || "build-info.json"
    );

    readFile(
      buildInfoPath,
      {
        encoding: "utf8"
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }

        resolve(data);
      }
    );
  });
}

async function buildAndMatch(options?: BuildInfoPluginOptions) {
  await build(options);

  expect(await readBuildInfo(options)).toMatchSnapshot();
}

describe("BuildInfoPlugin", () => {
  afterEach(done => {
    rmdir(buildDir, { recursive: true }, done);
  });

  describe("default options", () => {
    it('creates a "build-info.json" file with empty JSON', async () => {
      await buildAndMatch();
    });
  });

  describe("with user's build info", () => {
    it('creates a "build-info.json" file with given build info', async () => {
      await buildAndMatch({
        buildInfo: {
          release: "1.2.3"
        }
      });
    });
  });

  describe('with enabled "beautify" option', () => {
    it('creates a "build-info.json" file with formatted build info', async () => {
      await buildAndMatch({
        beautify: true,
        buildInfo: {
          release: "2.3.4"
        }
      });
    });
  });

  describe("with custom file name", () => {
    it("creates file with given build info and given file name", async () => {
      await buildAndMatch({
        buildInfo: {
          release: "2.3.4"
        },
        fileName: "static/release.json"
      });
    });
  });
});

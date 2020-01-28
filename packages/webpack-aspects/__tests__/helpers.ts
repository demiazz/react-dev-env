interface EnvironmentBackup {
  processEnvironment: NodeJS.ProcessEnv;
}

const environmentBackup: EnvironmentBackup = {
  processEnvironment: {}
};

export function saveEnvironment() {
  environmentBackup.processEnvironment = process.env;
}

export function restoreEnvironment() {
  process.env = environmentBackup.processEnvironment;
}

export function i(value: unknown): string {
  return value === undefined ? '"undefined"' : JSON.stringify(value);
}

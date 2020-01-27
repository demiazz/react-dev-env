export function setDefaultNodeEnvironment(
  defaultNodeEnvironment = "development"
) {
  const { NODE_ENV: nodeEnvironment } = process.env;

  if (nodeEnvironment == null || nodeEnvironment === "") {
    console.warn(
      'The default "NODE_ENV" environment variable was not specified. ' +
        'The "NODE_ENV" environment variable has been set to "development".'
    );

    process.env.NODE_ENV = defaultNodeEnvironment;
  }
}

export function validateNodeEnvironment(
  allowedEnvironments: string[],
  nodeEnvironment: string | undefined
) {
  if (nodeEnvironment == null) {
    throw new Error(
      'The "NODE_ENV" environment variable is required but was not specified'
    );
  }

  if (!allowedEnvironments.includes(nodeEnvironment)) {
    throw new Error(
      'Please specify a valid "NODE_ENV" environment variable. ' +
        'Valid values are "development" or "production". ' +
        `Instead, received: ${JSON.stringify(nodeEnvironment)}.`
    );
  }
}

export interface StartOptions {
  environment?: string;
  fixCwd?: boolean;
}

export function start(options: StartOptions = {}) {
  console.log("Starting.");

  // Log on Exit
  process.on("exit", () => {
    console.log("Exiting.");
  });

  // Change Current Working Directory
  if (options.fixCwd !== false) {
    process.chdir(__dirname + "/..");
  }

  // Set NODE_ENV
  const oldNodeEnv = process.env["NODE_ENV"];
  if (options.environment) {
    process.env["NODE_ENV"] = options.environment;
    if (!!oldNodeEnv && oldNodeEnv !== "develop") {
      console.warn(`\n\nstart-dev.js: NODE_ENV was previously set to "${oldNodeEnv}" but was overwritten to be "develop".\n\n`);
    }
  } else {
    if (!oldNodeEnv || oldNodeEnv.length < 1) {
      console.error("NODE_ENV cannot be empty. Use start-dev.js instead for development mode.");
      process.exit(1);
    }
  }
}

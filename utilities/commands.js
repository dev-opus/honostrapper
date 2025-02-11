import ora from 'ora';
import {
  bootstrap,
  strapConfig,
  strapCommons,
  handleServices,
  validateOption,
  validateServiceArgs,
  validateDepsOption,
} from '../utilities/index.js';

import { exec } from 'node:child_process';
import chalk from 'chalk';

const commands = ['bootstrap', 'service', 'commons', 'config'];
const options = ['--names=', '--truncate', '--install-deps'];

function npmInstall() {
  const spinner = ora('Installing dependencies...').start();
  exec(
    'npm i @hono/zod-openapi bcryptjs dotenv prisma winston zod @scalar/hono-api-reference @hono/node-server \
     && npm i -D @types/bcryptjs @types/node tsup tsx',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      console.log(stdout);

      if (stderr) {
        console.error(stderr);
      }

      console.log(chalk.green('Dependencies installed'));
      console.log(
        chalk.whiteBright('Do not forget to format your bootstrapped code!')
      );
      spinner.stop();
    }
  );
}

function handleServiceCommand(args) {
  const names = validateServiceArgs(args);

  if (args[2]) {
    if (args[2] !== options[1]) {
      throw new Error('Unsupported option: ' + args[2]);
    }

    handleServices(names, true);
  } else {
    handleServices(names, false);
  }
}

function handleCommonsCommand(args) {
  if (args[2]) {
    validateOption(args[2]);
    strapCommons(true);
  } else {
    strapCommons(false);
  }
}

function handleBootstrapCommand(args) {
  if (args[1]) {
    validateDepsOption(args[1]);
    bootstrap();
    npmInstall();
  } else {
    bootstrap();
  }
}

function handleConfigCommand(args) {
  if (args[2]) {
    validateOption(args[2]);
    strapConfig(true);
  } else {
    strapConfig(false);
  }
}

export function executeCommand(command, args) {
  switch (command) {
    case commands[0]:
      handleBootstrapCommand(args);
      break;
    case commands[1]:
      handleServiceCommand(args);
      break;
    case commands[2]:
      handleCommonsCommand(args);
      break;
    case commands[3]:
      handleConfigCommand(args);
      break;
    default:
      throw new Error('Unsupported command: ' + command);
  }
}

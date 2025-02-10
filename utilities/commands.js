import {
  bootstrap,
  strapConfig,
  strapCommons,
  handleServices,
  validateOption,
  validateServiceArgs,
} from '../utilities/index.js';

import { spawn } from 'node:child_process';

const commands = ['bootstrap', 'service', 'commons', 'config'];
const options = ['--names=', '--truncate'];

function npmInstall() {
  const npm = spawn('npm', ['--help']);

  npm.stdout.on('data', (data) => {
    console.log('data', data.toString());
  });

  npm.stderr.on('data', (data) => {
    console.error('error', data);
  });

  npm.on('close', (code) => {
    console.log(`child process exited with code: ${code}`);
  });
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
      bootstrap();
      npmInstall();
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

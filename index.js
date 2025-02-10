#!/usr/bin/env node

import {
  validateArgs,
  validateCommand,
  executeCommand,
} from './utilities/index.js';

import chalk from 'chalk';
import { argv, exit } from 'node:process';

function init() {
  try {
    const args = argv.slice(2);
    validateArgs(args);

    const command = args[0];
    validateCommand(command);

    executeCommand(command, args);
  } catch (error) {
    console.error(chalk.red('An error occurred: ' + error.message));
    exit(1);
  }
}

init();

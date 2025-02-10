const commands = ['bootstrap', 'service', 'commons', 'config'];
const options = ['--names=', '--truncate'];

export function validateArgs(args) {
  if (args.length > 3) {
    throw new Error('Too many arguments');
  }

  if (!args[0]) {
    throw new Error('Empty argument list');
  }
}

export function validateCommand(command) {
  if (!commands.includes(command.toLowerCase())) {
    throw new Error('Unsupported command received: ' + command);
  }
}

export function validateServiceArgs(args) {
  const namesArg = args[1];

  if (!namesArg) {
    throw new Error('Services names must be supplied');
  }

  if (!namesArg.startsWith(options[0])) {
    throw new Error('Unsupported argument format');
  }

  const names = namesArg.slice(8).split(',');

  if (names.length === 0) {
    throw new Error('Service names must be supplied');
  }

  const capNames = names.map(
    (name) => name[0].toUpperCase() + name.split('').splice(1).join('')
  );

  return capNames;
}

export function validateOption(option) {
  if (option !== options[1]) {
    throw new Error('Unsupported option: ' + option);
  }
}

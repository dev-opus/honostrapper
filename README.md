# Honostrapper CLI

Honostrapper is a CLI tool designed to bootstrap and manage various services, commons, and configurations for your [hono](https://hono.dev/) based project that integrates the [hono-openapi](https://hono.dev/examples/hono-openapi) package.

This README provides an overview of the available commands and their usage.

## Installation

To install Honostrapper, clone the repository and install the dependencies:

```bash
git clone https://github.com/dev-opus/honostrapper
cd honostrapper
npm install
```

To use the Honostrapper CLI, run the following command:

```bash
npm link
```

This will create a global symlink, allowing you to use the honostrapper command from any directory.

### Usage

To use the Honostrapper CLI, run the following command:

```bash
honostrapper <command> [options]
```

### Commands

`bootstrap`

Bootstraps an entire project.

```bash
honostrapper bootstrap [--install-deps]
```

- `--install-deps`: Optional flag to install dependencies after bootstrapping.

`service`

Manages services in the project. Requires the --names option to specify the service names.

```bash
honostrapper service --names=<service1,service2,...> [--truncate]
```

- `--names=`: Comma-separated list of service names.
- `--truncate`: Optional flag to truncate existing services.

`commons`

Manages common components in the project.

```bash
honostrapper commons [--truncate]
```

- `--truncate`: Optional flag to truncate existing common source files.

`config`

Manages configuration files in the project.

```bash
honostrapper config [--truncate]
```

- `--truncate`: Optional flag to truncate existing configuration files.

### Validators

The CLI includes several validators to ensure the correctness of the provided arguments and options.

`validateArgs(args)`

Validates the number of arguments.

`validateCommand(command)`

Validates the provided command.

`validateServiceArgs(args)`

Validates the service arguments.

`validateOption(option)`

Validates the provided option.

### Example

To bootstrap a project:

```bash
honostrapper bootstrap [--install-deps]
```

To manage services:

```bash
honostrapper service --names=<service1,service2,...> [--truncate]
```

To manage commons:

```bash
honostrapper commons [--truncate]
```

To manage configurations:

```bash
honostrapper config [--truncate]
```

### License

This project is licensed under the MIT License.

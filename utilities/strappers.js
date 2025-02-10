import { createFiles } from './files.js';

import * as Commons from '../templates/commons/index.js';
import * as Config from '../templates/config/index.js';
import * as Services from '../templates/services/index.js';
import { entrypoint } from '../templates/entrypoint.js';

export function bootstrap() {
  createFiles('./src/commons/', Commons);
  createFiles('./src/config/', Config);
  createFiles('./src/', { index: entrypoint() });
  defaultServicesStrap();
}

export function strapConfig(truncate) {
  createFiles('./src/config/', Config, truncate);
}

export function strapCommons(truncate) {
  createFiles('./src/commons/', Commons, truncate);
}

export function handleServices(services, truncate) {
  services.forEach((service) => {
    strapServices(service, truncate);
  });
}
function strapServices(name, truncate) {
  if (!name) {
    throw new Error('service requires at least one name');
  }

  const mainDir = './src/services/' + name.toLowerCase() + '/';
  const schemasDir = mainDir + 'schemas/';

  createFiles(
    schemasDir,
    {
      request: Services.schema,
      response: Services.schema,
    },
    truncate
  );

  createFiles(
    mainDir,
    {
      index: Services.servicesExporter,
      repository: Services.repository,
      routes: Services.strapRoutes(name),
      services: Services.strapService(name),
      controller: Services.starpController(name),
    },
    truncate
  );
}

function defaultServicesStrap() {
  const baseDir = './src/services/';
  const mainDir = baseDir + 'auth/';
  const schemasDir = mainDir + 'schemas/';

  createFiles(schemasDir, {
    request: Services.schema,
    response: Services.schema,
  });

  createFiles(mainDir, {
    index: Services.servicesExporter,
    repository: Services.repository,
    routes: Services.strapRoutes('Auth'),
    services: Services.strapService('Auth'),
    controller: Services.starpController('Auth'),
  });

  createFiles(baseDir, { index: Services.serviceEntry });
}

export const servicesExporter = `
export * from './controller';
`;

export const serviceEntry = `import { hono } from '../config';
import { AuthController } from './auth';

export const services = hono();

services.route('/auth', AuthController);
`;

export function strapRoutes(name) {
  return `import { authenticator } from '../../commons';
import { z, createRoute } from '@hono/zod-openapi';
import * as ${name}Requests from './schemas/request';
import * as ${name}Responses from './schemas/response';

const TAG = '${name}';
`;
}

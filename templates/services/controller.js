export function starpController(name) {
  return `
  import { hono } from '../../config';
  import * as Routes from './routes';
  import ${name}Service from './services';
  
  export const ${name}Controller = hono();
  
  `;
}

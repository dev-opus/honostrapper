export function entrypoint(title, description) {
  return `import { cors } from 'hono/cors';
import { logger } from './commons';
import { services } from './services';
import { serve } from '@hono/node-server';
import { hono, env, connect } from './config';
import { logger as httpLogger } from 'hono/logger';
import { HTTPException } from 'hono/http-exception';
import { apiReference } from '@scalar/hono-api-reference';

const app = hono();

app.use(cors());
app.use(httpLogger());

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: '${title ? title : 'your title goes here'}',
    description: '${description ? description : 'your description goes here'}',
  }
});

app.get(
  '/docs',
  apiReference({
    theme: 'saturn',
    spec: { url: '/doc' },
  })
);


app.route('/api', services)

connect().then(() => {
  try {
    serve({
      fetch: app.fetch,
      port: env.port,
    });

    logger.log(env.log_level, ${'`server listening on port: ${env.port}`'});
  } catch (error) {
    logger.error('Fatal error on startup', error);
    process.exit(1);
  }  
})

app.onError((error:any, c) => {
  logger.warn(error)

  if (error instanceof HTTPException) {
    // const res = error.getResponse()
    return c.json(
      { ok: false, message: error.message, cause: error.cause },
      error.status
    )
  }

  return c.json(
    {
      ok: false, 
      message: error.message || 'Internal Server error', 
      cause: error.cause
    },
    500
  );
});

`;
}

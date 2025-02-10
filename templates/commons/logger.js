export const logger = `import { env } from '../config';
import { createLogger, transports, format } from 'winston';

const { combine, timestamp, prettyPrint, errors } = format;
const logDir = env.node_env === 'prod' ? '/app/logs' : 'logs';

const errorLogLevel = 'warn';
const defaultLogLevel = env.log_level;

const devTransports = new transports.Console({
  level: defaultLogLevel,
});

const prodTransports = [
  new transports.Console({
    level: defaultLogLevel,
  }),

  new transports.File({
    filename: logDir + '/combined.log',
    level: defaultLogLevel,
  }),

  new transports.File({
    filename: logDir + '/errors.log',
    level: errorLogLevel,
  }),
];

export const logger = createLogger({
  transports: env.node_env === 'prod' ? prodTransports : devTransports,
  format: combine(errors({ stack: true }), timestamp(), prettyPrint()),
  exceptionHandlers: [
    new transports.File({ filename: logDir + '/exceptions.log' }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: logDir + '/rejections.log' }),
  ],
});

`;

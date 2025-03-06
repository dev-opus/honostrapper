export const loaders = `import { env } from './env';
import { logger } from '../commons';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient()

export async function connect() {
  prisma.$connect()
  .then(() => logger.log(env.log_level, 'Prisma Connected'))
  .catch((error) => logger.warn('Error Connecting Prisma', error));
}
`;

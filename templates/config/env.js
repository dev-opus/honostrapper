export const env = `import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT!),
  node_env: process.env.NODE_ENV!,
  log_level: process.env.LOG_LEVEL!,
  jwt_secret: process.env.JWT_SECRET!,
};
`;

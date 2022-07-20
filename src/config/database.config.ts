import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  password: process.env.POSTGRES_PASSWORD,
  name: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,

  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) || 100,
  sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
  rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
  ca: process.env.DATABASE_CA,
  key: process.env.DATABASE_KEY,
  cert: process.env.DATABASE_CERT,
}));

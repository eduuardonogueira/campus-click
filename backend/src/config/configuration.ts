import { ValidationError, ValidatorOptions } from 'class-validator';

export default () => ({
  port: parseInt(process.env.BACKEND_PORT ?? '3001', 10),
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT ?? '5432', 10),
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  externalUrl: process.env.RENDER_EXTERNAL_URL,
  internalHostname: process.env.RENDER_INTERNAL_HOSTNAME,
  hostUrl: process.env.HOST_URL,
});

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

import { config } from 'dotenv';
import { resolve } from 'path';
import validator from 'validator';
import { z } from 'zod';

config({ path: resolve(__dirname, '../../.env') });

const envVarsSchema = z
  .object({
    NODE_ENV: z
      .string()
      .refine((arg) =>
        validator.isIn(arg, ['development', 'production', 'test'])
      ),
    PORT: z
      .string()
      .transform((arg) => parseInt(arg, 10))
      .default('8080'),
    BACKEND_DOMAIN: z.string(),
    API_VERSION_V1: z.string(),
    DB_HOST: z.string().describe('Database Host'),
    DB_USERNAME: z.string().describe('Database username'),
    DB_PASSWORD: z.string().describe('Database password'),
    DB_NAME: z.string().describe('Database name'),
    DB_PORT: z.string().regex(/\d/).length(4).describe('Database port'),
    JWT_ACCESS_TOKEN_SECRET: z.string(),
    JWT_ACCESS_TOKEN_EXPIRESIN: z.string(),
    JWT_REFRESH_TOKEN_SECRET: z.string(),
    JWT_REFRESH_TOKEN_EXPIRESIN: z.string()
  })
  .passthrough();

const result = envVarsSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(`Config validation error: ${result.error.message}`);
}

const envVars = result.data;

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  backendDomain: envVars.BACKEND_DOMAIN,
  apiVersion: {
    v1: envVars.API_VERSION_V1
  },
  db: {
    database: envVars.DB_NAME,
    host: envVars.DB_HOST,
    port: parseInt(envVars.DB_PORT, 10),
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    dialect: 'postgresql'
  },
  jwt: {
    access: {
      secret: envVars.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: envVars.JWT_ACCESS_TOKEN_EXPIRESIN
    },
    refresh: {
      secret: envVars.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: envVars.JWT_REFRESH_TOKEN_EXPIRESIN
    }
  }
} as const;

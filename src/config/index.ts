import * as dotenv from 'dotenv';
import * as process from 'process';

import { assertToBeDefined, isDevOrTestEnv, isEnvCorrect } from '../helpers';
import { Env } from '../constants/enums/env.enum';

export const ENV: Env = process.env.JEST_WORKER_ID
  ? Env.TEST
  : (dotenv.config(), assertToBeDefined(process.env.NODE_ENV) as Env);

if (ENV === Env.DEVELOPMENT) {
  dotenv.config();
}

export function initializeValue(
  value: string | undefined,
  defaultValue: string,
) {
  if (isDevOrTestEnv(ENV) && !value) {
    return defaultValue;
  }

  return assertToBeDefined(value) as string;
}

if (!isEnvCorrect(ENV)) {
  throw new Error(`Invalid environment: ${ENV}`);
}

export const config = {
  JWT_TOKEN: initializeValue(process.env.JWT_TOKEN, 'fake_token'),
  PROJECT_NAME: initializeValue(process.env.PROJECT_NAME, 'gateway-api'),
  LOG_LEVEL: initializeValue(process.env.LOG_LEVEL, 'fatal'),
  USER_API_URL: initializeValue(
    process.env.USER_API_URL,
    'http://localhost:3032',
  ),
  RECIPE_API_URL: initializeValue(
    process.env.RECIPE_API_URL,
    'http://localhost:3031',
  ),
  BLOG_API_URL: initializeValue(
    process.env.BLOG_API_URL,
    'http://localhost:3033',
  ),
  PORT: parseInt(initializeValue(process.env.PORT, '3030') as string, 10),
  ENV,
};

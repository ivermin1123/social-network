import { createClient as createRedisClient } from "redis";

const REDIS_SEPARATOR = {
  HOST: process.env.REDIS_HOST || `0.0.0.0`,
  PORT: process.env.REDIS_PORT || `6379`,
  USR: process.env.REDIS_USER || ``,
  PWD: process.env.REDIS_PWD || ``,
};

const CLIENT_REDIS = createRedisClient({
  host: REDIS_SEPARATOR.HOST,
  port: REDIS_SEPARATOR.PORT,
  auth_pass: REDIS_SEPARATOR.PWD,
});

export { CLIENT_REDIS, REDIS_SEPARATOR };

import config from '@/config/config';
import * as redis from 'redis';

export const redisClient = redis.createClient({
  url: config.redis.url
});

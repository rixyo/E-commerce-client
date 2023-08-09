// use the Redis client from @upstash/redis package
// only set the token and url if they are not already set
import { Redis } from '@upstash/redis'
const getRedisUrl = () => {
  if(process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL){
    return process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL
  }
  throw new Error('UPSTASH_REDIS_REST_URL is not defined')
}
const getRedisToken = () => {
  if(process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN){
    return process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN
  }
  throw new Error('UPSTASH_REDIS_REST_TOKEN is not defined')
}

export const redis = new Redis({
  url: getRedisUrl(),
  token: getRedisToken(),
})
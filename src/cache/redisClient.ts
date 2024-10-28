import Redis from "ioredis";

// Initialize Redis client with connection details
const redis: Redis = new Redis({
  port: 12441, // Redis port
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

/**
 * Logs a message when successfully connected to Redis.
 * @event connect
 */
redis.on("connect", () => {
  console.log("Connected to Redis");
});

/**
 * Logs errors related to Redis operations.
 * @param {Error} err - The error object that was thrown.
 * @event error
 */
redis.on("error", (err) => {
  console.error("Redis error:", err);
});

// Export the Redis client instance as the default export
export default redis;

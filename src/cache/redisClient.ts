import Redis from "ioredis";

// Initialize Redis client using the provided URL from environment variables
const redis: Redis = new Redis({
  port: 12441, // Redis port
  host: process.env.NEXT_PUBLIC_REDIS_HOST,
  username: "default",
  password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
});

// Log a message when successfully connected to Redis
redis.on("connect", () => {
  console.log("Connected to Redis");
});

// Log Redis errors to the console
redis.on("error", (err) => {
  console.error("Redis error:", err);
});

// Export the Redis instance as the default export
export default redis;

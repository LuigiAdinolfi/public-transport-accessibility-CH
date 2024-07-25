"use server";

import connectDB from "@/db/connectDB";
import StopPointToStoreForDemo from "@/models/stopPointForDemo";
import redis from "@/cache/redisClient";

/**
 * Fetches stop points from Redis cache or MongoDB if the data is not in the cache.
 *
 * This function first attempts to retrieve stop points from Redis cache. If the data is not available in the
 * cache, it fetches the data from MongoDB, stores the data in Redis for future use, and then returns it.
 *
 * @returns {Promise<any>} - A promise that resolves to the stop points data if found, or `null` if no data is available.
 */
export async function fetchStopPointsRedis(): Promise<any> {
  const cacheKey = "stopPoints";

  // Attempt to get cached stop points data from Redis
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log("Redis: Returning cached data");

    // Parse the cached data, which is a list of sloids (unique identifiers)
    const sloidList = JSON.parse(cachedData);

    // Retrieve and parse each stop point data from Redis
    return await Promise.all(
      sloidList.map(async (sloid: string) => {
        const stopPointData = await redis.get(`stopPoint:${sloid}`);
        return JSON.parse(stopPointData || "{}");
      }),
    );
  }

  // Connect to MongoDB if data is not found in Redis cache
  await connectDB();

  console.log("Redis: Fetching stop points data from MongoDB");

  // Get the Mongoose model for stop points
  const stopPointsModel = StopPointToStoreForDemo();

  // Fetch stop points from MongoDB
  const stopPointsFromDB = await stopPointsModel.find().lean();

  if (stopPointsFromDB && stopPointsFromDB.length > 0) {
    console.log("Data fetched from MongoDB:", stopPointsFromDB);

    // Save each stop point individually in Redis with an expiration time of 1 hour
    for (const stopPoint of stopPointsFromDB) {
      const stopPointKey = `stopPoint:${stopPoint.sloid}`;
      await redis.set(stopPointKey, JSON.stringify(stopPoint), "EX", 3600);
    }

    // Save a list of sloids in Redis for quick reference
    const sloidList = stopPointsFromDB.map((sp) => sp.sloid);
    await redis.set(cacheKey, JSON.stringify(sloidList), "EX", 3600);

    return stopPointsFromDB;
  } else {
    console.log("No data found in MongoDB");
  }

  return null;
}

"use server";

import redis from "@/cache/redisClient";
import connectDB from "@/lib/connectDB";
import getPlatformModel from "@/models/platform";
import fetchPlatformsBySloid from "@/api/atlas/prm-directory/fetchPlatformsBySloid";
import { storePlatformBySloidToDB } from "@/db/storePlatformBySloidToDB";

/**
 * Fetches platform data by SLOID (Service Location IDentifier) from Redis cache,
 * MongoDB database, or API, in that order of priority.
 * Caches retrieved data in Redis for future use.
 * @param {string} sloid - The SLOID to fetch platform data for.
 * @returns {Promise<any>} The fetched platform data or null if not found.
 */
export async function fetchPlatform(sloid: string): Promise<any> {
  // Check Redis cache first
  const cachedPlatform = await redis.get(`platform:${sloid}`);
  if (cachedPlatform) {
    return JSON.parse(cachedPlatform);
  }

  // Connect to MongoDB
  await connectDB();

  // Check the database next
  const PlatformModel = getPlatformModel();
  const platformFromDB = await PlatformModel.findOne({ sloid });
  if (platformFromDB) {
    // Save the platform data to Redis cache
    await redis.set(
      `platform:${sloid}`,
      JSON.stringify(platformFromDB),
      "EX",
      86400,
    ); // Set cache for 1 day
    return platformFromDB;
  }

  // Fetch from API as a last resort
  const platformFromAPI = await fetchPlatformsBySloid(sloid);
  if (platformFromAPI) {
    // Store the platform data in the database
    const selectedFields = storePlatformBySloidToDB([platformFromAPI]);
    for (const item of selectedFields) {
      await PlatformModel.updateOne(
        { id: item.id },
        { $set: item },
        { upsert: true },
      );
    }

    // Save the platform data to Redis cache
    await redis.set(
      `platform:${sloid}`,
      JSON.stringify(platformFromAPI),
      "EX",
      86400,
    ); // Set cache for 1 day

    return platformFromAPI;
  }

  return null;
}

import redis from "@/cache/redisClient";
import connectDB from "@/db/connectDB";
import fetchPlatformBySloid from "@/services/atlas/prm-directory/fetchPlatformBySloid";
import { storePlatformToDB } from "@/db/storePlatformToDB";
import PlatformToStore from "@/models/platform";

/**
 * Fetches platform data by SLOID (Service Location IDentifier) from Redis cache,
 * MongoDB database, or API, in that order of priority.
 * Caches retrieved data in Redis for future use.
 * @param {string} sloid - The SLOID to fetch platform data for.
 * @returns {Promise<{data: any, ok: boolean}>} The platform data and status.
 */
export async function fetchPlatformFromLocalAPI(
  sloid: string,
): Promise<{ data: any; ok: boolean }> {
  try {
    // Check Redis cache first
    const cachedPlatform = await redis.get(`platform:${sloid}`);
    if (cachedPlatform) {
      console.log(`Redis: Retrieved platform data for sloid ${sloid}`);
      return { data: JSON.parse(cachedPlatform), ok: true };
    }

    // Connect to MongoDB
    await connectDB();

    // Check the database next
    const PlatformModel = PlatformToStore();
    const platformFromDB = await PlatformModel.findOne({ sloid });
    if (platformFromDB) {
      console.log(`MongoDB: Retrieved platform data for sloid ${sloid}`);
      // Save the platform data to Redis cache
      await redis.set(
        `platform:${sloid}`,
        JSON.stringify(platformFromDB),
        "EX",
        86400,
      ); // Set cache for 1 day
      return { data: platformFromDB, ok: true };
    }

    // Fetch from API as a last resort
    const platformFromAPI = await fetchPlatformBySloid(sloid);
    if (platformFromAPI) {
      console.log(`API: Retrieved platform data for sloid ${sloid}`);
      // Store the platform data in the database
      const selectedFields = storePlatformToDB([platformFromAPI]);
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

      return { data: platformFromAPI, ok: true };
    }

    return { data: { message: "Platform not found" }, ok: false };
  } catch (error) {
    console.error(
      `Error in fetchPlatformFromLocalAPI for SLOID ${sloid}:`,
      error,
    );
    return { data: { message: error }, ok: false };
  }
}

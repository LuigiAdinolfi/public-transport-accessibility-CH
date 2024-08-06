"use server";

import redis from "@/cache/redisClient";
import connectDB from "@/db/connectDB";
import fetchStopPointBySloid from "@/services/atlas/prm-directory/fetchStopPointBySloid";
import { storeStopPointToDB } from "@/db/storeStopPointToDB";
import { StopPointToStore } from "@/models/stopPoint";

/**
 * Fetches stop point data by SLOID (Service Location IDentifier) from Redis cache,
 * MongoDB database, or API, in that order of priority.
 * Caches the retrieved data in Redis for future use.
 *
 * @param {string} sloid - The SLOID to fetch stop point data for.
 * @returns {Promise<{data: any, ok: boolean}>} A promise that resolves to an object containing the stop point data and a success status.
 */
export async function retrieveStopPointData(sloid: string) {
  try {
    // Check Redis cache first
    const cachedStopPoint = await redis.get(`stopPoint:${sloid}`);
    if (cachedStopPoint) {
      console.log(`Redis: Retrieved stop point data for sloid ${sloid}`);
      return { data: JSON.parse(cachedStopPoint), ok: true };
    }

    // Connect to MongoDB
    await connectDB();

    // Check the database next
    const StopPointModel = StopPointToStore();
    const stopPointFromDB = await StopPointModel.findOne({ sloid });
    if (stopPointFromDB) {
      console.log(`MongoDB: Retrieved stop point data for sloid ${sloid}`);
      // Save the stop point data to Redis cache
      await redis.set(
        `stopPoint:${sloid}`,
        JSON.stringify(stopPointFromDB),
        "EX",
        86400,
      ); // Set cache expiration for 1 day
      return { data: stopPointFromDB, ok: true };
    }

    // Fetch from API as a last resort
    const stopPointFromAPI = await fetchStopPointBySloid(sloid);
    if (stopPointFromAPI) {
      console.log(`API: Retrieved stop point data for sloid ${sloid}`);
      // Store the stop point data in the database
      const selectedFields = storeStopPointToDB([stopPointFromAPI]);
      for (const item of selectedFields) {
        await StopPointModel.updateOne(
          { id: item.id },
          { $set: item },
          { upsert: true },
        );
      }

      // Save the stop point data to Redis cache
      await redis.set(
        `stopPoint:${sloid}`,
        JSON.stringify(stopPointFromAPI),
        "EX",
        86400,
      ); // Set cache expiration for 1 day

      return { data: stopPointFromAPI, ok: true };
    }

    return { data: { message: "Stop point not found" }, ok: false };
  } catch (error) {
    console.error(`Error fetching stop point for sloid ${sloid}:`, error);
    return { data: { message: error || "An error occurred" }, ok: false };
  }
}

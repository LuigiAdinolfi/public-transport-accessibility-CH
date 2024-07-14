"use server";

import redis from "@/cache/redisClient";
import connectDB from "@/db/connectDB";
import StopPointToStore from "@/models/stopPoint";
import fetchStopPointBySloid from "@/services/atlas/prm-directory/fetchStopPointBySloid";
import { storeStopPointToDB } from "@/db/storeStopPointToDB";

export async function fetchStopPointFromLocalAPI(sloid: string) {
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
      ); // Set cache for 1 day
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
      ); // Set cache for 1 day

      return { data: stopPointFromAPI, ok: true };
    }

    return { data: { message: "Stop point not found" }, ok: false };
  } catch (error) {
    console.error(
      `Error in fetchStopPointFromLocalAPI for SLOID ${sloid}:`,
      error,
    );
    return { data: { message: "Error fetching stop point" }, ok: false };
  }
}

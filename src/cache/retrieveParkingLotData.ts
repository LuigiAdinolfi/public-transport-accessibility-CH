"use server";

import redis from "@/cache/redisClient";
import connectDB from "@/db/connectDB";
import fetchParkingLotsByParentSloid from "@/services/atlas/prm-directory/fetchParkingLotsByParentSloid";
import { storeParkingLotToDB } from "@/db/storeParkingLotToDB";
import ParkingLotToStore from "@/models/parkingLot";

/**
 * Fetches parking lot data for a given parent service point SLOID from local sources.
 *
 * This function first attempts to retrieve parking lot data from Redis cache. If the data is not present in
 * the cache, it then queries MongoDB. If the data is not found in MongoDB, it fetches the data from an external API.
 * It also updates Redis and MongoDB with the fetched data for future use.
 *
 * @param {string} parentServicePointSloid - The SLOID (Service Location Object ID) of the parent service point.
 * @returns {Promise<{ data: object, ok: boolean }>} - A promise that resolves to an object containing the parking
 * lot data and a boolean indicating the success of the operation.
 */
export async function retrieveParkingLotData(parentServicePointSloid: string) {
  try {
    // Check Redis cache first
    const cachedParkingLot = await redis.get(
      `parkingLot:${parentServicePointSloid}`,
    );
    if (cachedParkingLot) {
      console.log(
        `Redis: Retrieved parking lot data for parent SLOID ${parentServicePointSloid}`,
      );
      return { data: JSON.parse(cachedParkingLot), ok: true };
    }

    // Connect to MongoDB
    await connectDB();

    // Check the database next
    const ParkingLotModel = ParkingLotToStore();
    let parkingLotFromDB = await ParkingLotModel.findOne({
      parentServicePointSloid,
    });
    if (parkingLotFromDB) {
      console.log(
        `MongoDB: Retrieved parking lot data for parent SLOID ${parentServicePointSloid}`,
      );
      parkingLotFromDB = parkingLotFromDB.toObject(); // Convert to plain object
      await redis.set(
        `parkingLot:${parentServicePointSloid}`,
        JSON.stringify(parkingLotFromDB),
        "EX",
        86400, // Cache expiration time set to 24 hours
      );
      return { data: parkingLotFromDB, ok: true };
    }

    // Fetch from API as a last resort
    const parkingLotFromAPI = await fetchParkingLotsByParentSloid(
      parentServicePointSloid,
    );
    if (parkingLotFromAPI) {
      console.log(
        `API: Retrieved parking lot data for parent SLOID ${parentServicePointSloid}`,
      );
      const selectedFields = storeParkingLotToDB([parkingLotFromAPI]);
      for (const item of selectedFields) {
        await ParkingLotModel.updateOne(
          { id: item.id },
          { $set: item },
          { upsert: true },
        );
      }
      await redis.set(
        `parkingLot:${parentServicePointSloid}`,
        JSON.stringify(parkingLotFromAPI),
        "EX",
        86400, // Cache expiration time set to 24 hours
      );
      return { data: parkingLotFromAPI, ok: true };
    }

    return { data: {}, ok: false };
  } catch (error) {
    // Log the error if something goes wrong
    console.log(
      `Error in fetchParkingLotFromLocalAPI for parent SLOID ${parentServicePointSloid}:`,
      error,
    );
    return { data: { message: error }, ok: false };
  }
}

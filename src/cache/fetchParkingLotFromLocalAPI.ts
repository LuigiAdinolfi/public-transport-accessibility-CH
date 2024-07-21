"use server";

import redis from "@/cache/redisClient";
import connectDB from "@/db/connectDB";
import fetchParkingLotsByParentSloid from "@/services/atlas/prm-directory/fetchParkingLotsByParentSloid";
import { storeParkingLotToDB } from "@/db/storeParkingLotToDB";
import ParkingLotToStore from "@/models/parkingLot";

export async function fetchParkingLotFromLocalAPI(
  parentServicePointSloid: string,
) {
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
        86400,
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
        86400,
      );
      return { data: parkingLotFromAPI, ok: true };
    }

    return { data: {}, ok: false };
  } catch (error) {
    console.log(
      `Error in fetchParkingLotFromLocalAPI for parent SLOID ${parentServicePointSloid}:`,
      error,
    );
    return { data: { message: error }, ok: false };
  }
}

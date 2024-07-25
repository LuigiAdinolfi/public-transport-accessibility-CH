import connectDB from "@/db/connectDB";
import fetchFromAPIByParentSloid from "@/lib/fetchFromAPIByParentSloid";
import ParkingLotToStore from "@/models/parkingLot";
import { Document } from "mongoose";

/**
 * Fetches parking lot data from an external API based on the provided endpoint and SLOID,
 * processes the data using a provided function to select specific fields, and then stores
 * the processed data in a MongoDB collection. If data with the same ID already exists, it will
 * be updated; otherwise, a new document will be created.
 *
 * @template T - The type of the document to be stored in MongoDB.
 * @param {string} endpoint - The API endpoint from which to fetch the data.
 * @param {(data: any[]) => T[]} selectFieldsFn - A function that processes the fetched data and
 * returns an array of objects conforming to the document type T.
 * @param {string} parentSloid - The SLOID (Service Location Object ID) used to fetch the data.
 * @returns {Promise<any | null>} - A promise that resolves to the response data from the API, or
 * null if there was an error or invalid response structure.
 */
export default async function fetchAndStoreParkingLotsByParentSloid<
  T extends Document,
>(
  endpoint: string,
  selectFieldsFn: (data: any[]) => T[],
  parentSloid: string,
): Promise<any | null> {
  console.log(
    `fetchAndStoreParkingLotsByParentSloidToDB called with sloid: ${parentSloid}`,
  );

  // Connect to MongoDB
  await connectDB();

  try {
    console.log(
      `Fetching data from endpoint: ${endpoint} with sloid: ${parentSloid}`,
    );

    // Fetch data from the API
    const response = await fetchFromAPIByParentSloid(endpoint, parentSloid);

    if (response) {
      // Process the response data
      let data = Array.isArray(response)
        ? response
        : response.objects
          ? response.objects
          : [response];
      console.log("Data fetched successfully, processing data...");

      // Apply the provided function to select specific fields from the data
      const selectedFields = selectFieldsFn(data);

      // Get the MongoDB model for parking lots
      const ParkingLotsModel = ParkingLotToStore();

      // Upsert each item into MongoDB
      for (const item of selectedFields) {
        console.log(`Upserting item with ID: ${item.id}`);
        await ParkingLotsModel.updateOne(
          { id: item.id },
          { $set: item },
          { upsert: true },
        );
      }

      console.log(
        "Selected fields saved to MongoDB with upsert (by parentSloid)",
      );
      return response;
    } else {
      console.error("Invalid response structure:", response);
      return null;
    }
  } catch (error) {
    // Log error if something goes wrong
    console.error(
      `Failed to fetch parking lots for parent SLOID ${parentSloid}:`,
      error,
    );
    return null;
  }
}

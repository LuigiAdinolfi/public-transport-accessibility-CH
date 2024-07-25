import { Document } from "mongoose";
import connectDB from "@/db/connectDB";
import fetchFromAPIBySloid from "@/lib/fetchFromAPIBySloid";
import PlatformToStore from "@/models/platform";

/**
 * Fetches data from the specified API endpoint using a given SLOID,
 * processes the data using a provided function to select specific fields,
 * and then saves or updates the selected fields in MongoDB. Logs both
 * errors and success messages for debugging purposes.
 *
 * @template T - The type of document to be stored in MongoDB.
 * @param {string} endpoint - The API endpoint from which to fetch data.
 * @param {(data: any[]) => T[]} selectFieldsFn - A function that processes the fetched data
 * and returns an array of objects conforming to the document type T.
 * @param {string} sloid - The specific SLOID used to fetch the data.
 * @returns {Promise<any | null>} - A promise that resolves to the API response data if successful,
 * or null if the operation fails or if the response structure is invalid.
 */
export default async function fetchAndStorePlatformBySloidToDB<
  T extends Document,
>(
  endpoint: string,
  selectFieldsFn: (data: any[]) => T[],
  sloid: string,
): Promise<any | null> {
  console.log(`fetchAndStorePlatformBySloidToDB called with sloid: ${sloid}`);

  // Connect to MongoDB
  await connectDB();

  try {
    console.log(
      `Fetching data from endpoint: ${endpoint} with sloid: ${sloid}`,
    );

    // Fetch data from the API
    const response = await fetchFromAPIBySloid(endpoint, sloid);

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

      // Get the MongoDB model for platforms
      const PlatformModel = PlatformToStore();

      // Upsert each item into MongoDB
      for (const item of selectedFields) {
        console.log(`Upserting item with ID: ${item.id}`);
        await PlatformModel.updateOne(
          { id: item.id },
          { $set: item },
          { upsert: true },
        );
      }

      console.log("Selected fields saved to MongoDB with upsert (by sloid)");
      return response;
    } else {
      console.error("Invalid response structure:", response);
      return null;
    }
  } catch (error) {
    // Log error if something goes wrong
    console.error("Failed to fetch or save data:", error);
    return null;
  }
}

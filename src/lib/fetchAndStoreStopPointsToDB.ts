"use server";

import fetchFromAPI from "@/lib/fetchFromAPI";
import connectDB from "@/db/connectDB";
import StopPointToStoreForDemo from "@/models/stopPoint";

/**
 * Fetches data from the specified API endpoint and saves selected fields to MongoDB using upsert.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {Function} selectFieldsFn - A function to select specific fields from the fetched data.
 * @returns {Promise<any | null>} The response data or null if the request failed.
 */
export default async function fetchAndStoreStopPointsToDB<
  T extends { id: string },
>(endpoint: string, selectFieldsFn: (data: any[]) => T[]): Promise<any | null> {
  console.log("Connecting to database...");
  await connectDB();
  console.log("Database connected");

  try {
    console.log(`Fetching data from endpoint: ${endpoint}`);
    const response = await fetchFromAPI(endpoint);

    if (response && Array.isArray(response.objects)) {
      const data = response.objects;

      console.log("Data fetched successfully, processing data...");

      const selectedFields = selectFieldsFn(data);

      const StopPointsModel = StopPointToStoreForDemo();
      for (const item of selectedFields) {
        console.log(`Upserting item with ID: ${item.id}`);
        await StopPointsModel.updateOne(
          { id: item.id },
          { $set: item },
          { upsert: true },
        );
      }

      console.log(
        "Selected fields saved to MongoDB with upsert (fetchAndStoreDataToDB)",
      );

      return data; // Return the fetched data
      // return selectedFields; // Return the processed data
    } else {
      console.error("Invalid response structure:", response);
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch or save data:", error);
    return null;
  }
}

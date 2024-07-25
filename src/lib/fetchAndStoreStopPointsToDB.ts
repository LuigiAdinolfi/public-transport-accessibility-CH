"use server";

import fetchFromAPI from "@/lib/fetchFromAPI";
import connectDB from "@/db/connectDB";
import StopPointToStoreForDemo from "@/models/stopPointForDemo";

/**
 * Fetches data from the specified API endpoint and saves selected fields to MongoDB using upsert.
 * Logs both success and error messages to assist with debugging.
 *
 * @template T - The type of objects being stored, which must have an 'id' property of type string.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {(data: any[]) => T[]} selectFieldsFn - A function that takes the fetched data and returns an array of selected fields.
 * @returns {Promise<any | null>} A promise that resolves to the fetched data if successful, or null if the request failed or the response structure is invalid.
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

    // Check if the response is valid and contains the expected structure
    if (response && Array.isArray(response.objects)) {
      const data = response.objects;

      console.log("Data fetched successfully, processing data...");

      // Process the data using the provided function
      const selectedFields = selectFieldsFn(data);

      // Get the MongoDB model for storing stop points
      const StopPointsModel = StopPointToStoreForDemo();

      // Upsert each item into MongoDB
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

      // Return the fetched data or processed data based on the requirement
      return data; // Uncomment if you want to return the raw fetched data
      // return selectedFields; // Uncomment if you want to return the processed data
    } else {
      console.error("Invalid response structure:", response);
      return null;
    }
  } catch (error) {
    // Log any errors encountered during fetching or saving data
    console.error("Failed to fetch or save data:", error);
    return null;
  }
}

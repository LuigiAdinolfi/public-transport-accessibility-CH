"use server";

import connectDB from "@/db/connectDB";
import StopPointToStoreForDemo from "@/models/stopPointForDemo";
import fetchStopPointsForDemo from "@/services/atlas/prm-directory/fetchStopPointsForDemo";
import { storeStopPointToDBForDemo } from "@/db/storeStopPointToDBForDemo";

/**
 * Fetches stop points from an external API, processes them, and stores them in MongoDB.
 *
 * This function connects to the MongoDB database, retrieves stop points from an external API,
 * processes the data to select specific fields, and updates or inserts the data into the MongoDB collection.
 *
 * @returns {Promise<any>} - A promise that resolves to the fetched stop points if successful, or `null` if no data is found.
 */
export async function fetchStopPointsMongoDB(): Promise<any> {
  // Connect to the MongoDB database
  await connectDB();

  // Get the Mongoose model for stop points
  const StopPointModel = StopPointToStoreForDemo();

  // Fetch stop points from the external API
  const stopPoints = await fetchStopPointsForDemo();
  if (stopPoints) {
    // Process the fetched data to select specific fields
    const selectedFields = storeStopPointToDBForDemo([stopPoints]);

    // Update or insert each stop point into the MongoDB collection
    for (const item of selectedFields) {
      await StopPointModel.updateOne(
        { id: item.id }, // Match document by ID
        { $set: item }, // Update the document with new data
        { upsert: true }, // Insert a new document if no matching document is found
      );
    }
    console.log(
      "Selected fields saved to MongoDB with upsert (fetchStopPointsMongoDB)",
    );
    return stopPoints;
  }

  // Return null if no stop points were fetched
  return null;
}

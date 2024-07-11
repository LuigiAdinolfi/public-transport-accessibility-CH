"use server";

import { Document } from "mongoose";
import connectDB from "@/db/connectDB";
import fetchFromAPIBySloid from "@/lib/fetchFromAPIBySloid";
import getPlatformModel from "@/models/platform";
import PlatformToStore from "@/models/platform";

/**
 * Fetches data from the specified API endpoint by SLOID,
 * processes the data using a provided function to select fields,
 * and saves the selected fields to MongoDB with upsert.
 * Logs errors and success messages for debugging purposes.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {Function} selectFieldsFn - A function to select fields from the fetched data.
 * @param {string} sloid - The specific SLOID to fetch data for.
 * @returns {Promise<any | null>} The response from the API or null if the operation fails.
 */
export default async function fetchAndStorePlatformBySloidToDB<
  T extends Document,
>(
  endpoint: string,
  selectFieldsFn: (data: any[]) => T[],
  sloid: string,
): Promise<any | null> {
  console.log(`fetchAndStorePlatformBySloidToDB called with sloid: ${sloid}`);
  await connectDB();

  try {
    console.log(
      `Fetching data from endpoint: ${endpoint} with sloid: ${sloid}`,
    );
    const response = await fetchFromAPIBySloid(endpoint, sloid);

    if (response) {
      let data = Array.isArray(response)
        ? response
        : response.objects
          ? response.objects
          : [response];
      console.log("Data fetched successfully, processing data...");

      const selectedFields = selectFieldsFn(data);

      const PlatformModel = PlatformToStore();
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
    console.error("Failed to fetch or save data:", error);
    return null;
  }
}

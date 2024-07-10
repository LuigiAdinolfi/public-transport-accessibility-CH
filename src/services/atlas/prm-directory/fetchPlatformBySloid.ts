"use server";

import fetchAndStoreDataBySloidToDB from "@/lib/fetchAndStoreDataBySloidToDB";
import { storePlatformBySloidToDB } from "@/db/storePlatformBySloidToDB";
import PlatformToStore from "@/models/platform";

/**
 * Fetches platform data by SLOID from the API.
 *
 * @param {string} sloid - The SLOID to append to the endpoint.
 * @returns {Promise<any | null>} The response data or null if the request failed.
 */
export default async function fetchPlatformBySloid(
  sloid: string,
): Promise<any | null> {
  try {
    return await fetchAndStoreDataBySloidToDB(
      "/prm-directory/v1/platforms",
      storePlatformBySloidToDB,
      PlatformToStore,
      sloid,
    );
  } catch (error) {
    console.error(`Failed to fetch platforms for SLOID ${sloid}:`, error);
    return null;
  }
}

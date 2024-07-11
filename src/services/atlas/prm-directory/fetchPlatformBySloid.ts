"use server";

import fetchAndStorePlatformBySloidToDB from "@/lib/fetchAndStorePlatformBySloidToDB";
import { storePlatformToDB } from "@/db/storePlatformToDB";
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
    return await fetchAndStorePlatformBySloidToDB(
      "/prm-directory/v1/platforms",
      storePlatformToDB,
      sloid,
    );
  } catch (error) {
    console.error(`Failed to fetch platforms for SLOID ${sloid}:`, error);
    return null;
  }
}

import fetchAndStoreParkingLotsByParentSloid from "@/lib/fetchAndStoreParkingLotsByParentSloid";
import { storeParkingLotToDB } from "@/db/storeParkingLotToDB";

/**
 * Fetches parking lots data by parent service point SLOID from the API.
 *
 * @param {string} parentServicePointSloid - The parent service point SLOID to append to the endpoint.
 * @returns {Promise<any | null>} The response data or null if the request failed.
 */
export default async function fetchParkingLotsByParentSloid(
  parentServicePointSloid: string,
): Promise<any | null> {
  try {
    // Fetch parking lots data from the specified endpoint with the provided parentServicePointSloid
    return await fetchAndStoreParkingLotsByParentSloid(
      "/prm-directory/v1/parking-lots/",
      storeParkingLotToDB,
      parentServicePointSloid,
    );
  } catch (error) {
    // Log any errors that occur during the fetch operation
    console.error(
      `Failed to fetch parking lots for parent SLOID ${parentServicePointSloid}:`,
      error,
    );
    return null;
  }
}

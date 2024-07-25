import fetchAndStoreParkingLotsByParentSloid from "@/lib/fetchAndStoreParkingLotsByParentSloid";
import { storeParkingLotToDB } from "@/db/storeParkingLotToDB";

/**
 * Fetches parking lots data for a given parent service point SLOID from the API and stores it in the database.
 *
 * This function uses the provided `parentServicePointSloid` to fetch parking lots data from the API
 * and then stores the data in the database using the `storeParkingLotToDB` function.
 *
 * @param {string} parentServicePointSloid - The parent service point SLOID to be appended to the API endpoint.
 * @returns {Promise<any | null>} A promise that resolves to the fetched parking lots data, or null if the request fails.
 */
export default async function fetchParkingLotsByParentSloid(
  parentServicePointSloid: string,
): Promise<any | null> {
  try {
    // Fetch parking lots data from the API and store it in the database
    return await fetchAndStoreParkingLotsByParentSloid(
      "/prm-directory/v1/parking-lots/",
      storeParkingLotToDB,
      parentServicePointSloid,
    );
  } catch (error) {
    // Log any errors that occur during the fetch or store operations
    console.error(
      `Failed to fetch parking lots data for parent SLOID ${parentServicePointSloid}:`,
      error,
    );
    return null;
  }
}

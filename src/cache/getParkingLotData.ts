import { retrieveParkingLotData } from "@/cache/retrieveParkingLotData";

/**
 * Fetches parking lot data for a given parent service point SLOID from the local API.
 *
 * This function calls `fetchParkingLotFromLocalAPI` with the provided parent service point SLOID to get
 * parking lot information. It handles any errors that occur during the fetch process and ensures that
 * the response data is returned as a plain object.
 *
 * @param {string} parentServicePointSloid - The SLOID (Service Location Object ID) of the parent service point.
 * @returns {Promise<object>} - A promise that resolves to the parking lot data as a plain object, or an empty object if an error occurs.
 */
export async function getParkingLotData(parentServicePointSloid: string) {
  try {
    // Fetch parking lot data using the local API
    const { data, ok } = await retrieveParkingLotData(parentServicePointSloid);

    if (!ok) {
      // Log an error message if the fetch was unsuccessful
      console.log(
        `Error fetching parking lots for parent SLOID ${parentServicePointSloid}:`,
        data,
      );
    }

    // Ensure the data is returned as a plain object
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    // Log an error message if an exception occurs during the fetch
    console.log(
      `Parking lot with parent SLOID ${parentServicePointSloid} not found!`,
    );
    // Return an empty object if an exception occurs
    return {};
  }
}

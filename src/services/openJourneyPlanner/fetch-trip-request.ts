import * as OJP from "ojp-sdk";

/**
 * Asynchronously fetches trip details from the OJP API based on the provided parameters.
 *
 * This function initializes a trip request using the OJP SDK and fetches the response containing trip details.
 * The request is based on the origin and destination stop references, the specified date and time, and whether
 * the search is for departure or arrival.
 *
 * @async
 * @function fetchTripRequest
 * @param {string} fromStopRef - The stop reference ID for the origin location.
 * @param {string} toStopRef - The stop reference ID for the destination location.
 * @param {Date} dateTime - The date and time for the trip.
 * @param {"Dep" | "Arr"} activeSearchTab - The active search tab indicating 'Dep' for departure or 'Arr' for arrival.
 * @returns A promise that resolves to the trip response containing trip details.
 * @throws {Error} Throws an error if the TripRequest initialization fails or if the fetch operation encounters an error.
 */
export async function fetchTripRequest(
  fromStopRef: string,
  toStopRef: string,
  dateTime: Date,
  activeSearchTab: "Dep" | "Arr",
) {
  const request = OJP.TripRequest.initWithStopRefs(
    OJP.DEFAULT_STAGE,
    fromStopRef,
    toStopRef,
    dateTime,
    activeSearchTab,
  );

  // Check if the request was successfully initialized
  if (!request) {
    throw new Error("TripRequest initialization failed. Request is null.");
  }

  try {
    // Fetch the response from the OJP API
    const response = await request.fetchResponse();
    console.log("Trip request response:", response);
    return response;
  } catch (error) {
    // Log and rethrow any errors encountered during the fetch operation
    console.error("Error fetching trip request:", error);
    throw error;
  }
}

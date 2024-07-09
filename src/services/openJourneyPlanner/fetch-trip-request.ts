import * as OJP from "ojp-sdk";

/**
 * Asynchronously fetches trip details from the OJP API based on provided parameters.
 * @async
 * @function fetchTripRequest
 * @param {string} fromStopRef - The stop reference ID for the origin location.
 * @param {string} toStopRef - The stop reference ID for the destination location.
 * @param {Date} dateTime - The date and time for the trip.
 * @param {"Dep" | "Arr"} activeSearchTab - The active search tab ('Dep' for departure, 'Arr' for arrival).
 * @returns a promise that resolves to the trip response from the OJP API.
 * @throws {Error} Will throw an error if the TripRequest initialization fails or if the fetch operation encounters an error.
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
  if (!request) {
    throw new Error("TripRequest initialization failed. Request is null.");
  }

  try {
    const response = await request.fetchResponse();
    console.log("Trip request response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching trip request:", error);
    throw error;
  }
}

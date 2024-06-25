import * as OJP from "ojp-sdk";

// export async function fetchTripRequest(fromStopRef: string, toStopRef: string, dateTime: Date) {
//   // const fromStopRef = '8500010';  // Basel SBB
//   // const toStopRef = '8500309';    // Brugg AG
//
//
//   const fromLocation = OJP.Location.initWithStopPlaceRef(fromStopRef);
//   const toLocation = OJP.Location.initWithStopPlaceRef(toStopRef);
//
//   const request = OJP.TripRequest.initWithStopRefs(OJP.DEFAULT_STAGE, fromStopRef, toStopRef, new Date(), 'Dep');
// // const request = OJP.TripRequest.initWithLocationsAndDate(OJP.DEFAULT_STAGE, fromLocation, toLocation, dateTime, 'Dep')
//
//   if (request !== null) {
//     const response = await request.fetchResponse();
//     console.log('a) TR using await/async');
//     console.log(response);
//     return response;
//   } else {
//     console.error('TripRequest initialization failed. Request is null.');
//     return null;
//   }
// }


/**
 * Fetches trip details from OJP API based on provided parameters.
 * @param {string} fromStopRef - The stop reference ID for the origin location.
 * @param {string} toStopRef - The stop reference ID for the destination location.
 * @param {Date} dateTime - The date and time for the trip.
 * @param {'Dep' | 'Arr'} activeSearchTab - The active search tab ('Dep' for departure, 'Arr' for arrival).
 */
export async function fetchTripRequest(fromStopRef: string, toStopRef: string, dateTime: Date, activeSearchTab: 'Dep' | 'Arr') {
  const request = OJP.TripRequest.initWithStopRefs(OJP.DEFAULT_STAGE, fromStopRef, toStopRef, dateTime, activeSearchTab);
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
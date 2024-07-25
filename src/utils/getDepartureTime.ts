import * as OJP from "ojp-sdk";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";
import { formatTime } from "@/utils/formatTime";

/**
 * Retrieves the departure time for a given TripLeg.
 *
 * @param {OJP.TripLeg} leg - The TripLeg object from which to extract the departure time.
 *                             The leg must be a TripTimedLeg to have a valid departure time.
 * @returns {string} - The formatted departure time as a string (HH:mm) if the leg is a TripTimedLeg,
 *                     or "N/A" if the leg is not a TripTimedLeg or if departure time is not available.
 */
export const getDepartureTime = (leg: OJP.TripLeg): string => {
  // Check if the provided leg is a TripTimedLeg
  if (!isTripTimedLeg(leg)) return "N/A";

  // Extract and format the departure time, or return "N/A" if not available
  return formatTime(leg.fromStopPoint.departureData?.timetableTime ?? null);
};

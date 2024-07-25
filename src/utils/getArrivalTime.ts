import * as OJP from "ojp-sdk";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";
import { formatTime } from "@/utils/formatTime";

/**
 * Returns the arrival time of a given TripLeg.
 *
 * @param {OJP.TripLeg} leg - The TripLeg object from which to extract the arrival time.
 *                             Must be a TripTimedLeg for a valid result.
 * @returns {string} - The formatted arrival time of the leg as a string (HH:mm),
 *                     or "N/A" if the leg is not a TripTimedLeg or if arrival time is not available.
 */
export const getArrivalTime = (leg: OJP.TripLeg): string => {
  // Check if the provided leg is a TripTimedLeg
  if (!isTripTimedLeg(leg)) return "N/A";

  // Extract and format the arrival time, or return "N/A" if not available
  return formatTime(leg.toStopPoint.arrivalData?.timetableTime ?? null);
};

import * as OJP from "ojp-sdk";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";
import { formatTime } from "@/utils/formatTime";

/**
 * Returns the departure time of a given TripLeg.
 * @param {OJP.TripLeg} leg - The TripLeg object to get the departure time from.
 * @returns {string} - The departure time of the leg or N/A if the leg is not a TripTimedLeg.
 */
export const getDepartureTime = (leg: OJP.TripLeg): string => {
  if (!isTripTimedLeg(leg)) return "N/A";
  return formatTime(leg.fromStopPoint.departureData?.timetableTime ?? null);
};

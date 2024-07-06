import * as OJP from "ojp-sdk";

import { isTripTimedLeg } from "@/utils/isTripTimedLeg";
import { formatTime } from "@/utils/formatTime";

/**
 * Returns the arrival time of a given TripLeg.
 * @param {OJP.TripLeg} leg - The TripLeg object to get the arrival time from.
 * @returns {string} - The arrival time of the leg or N/A if the leg is not a TripTimedLeg.
 */
export const getArrivalTime = (leg: OJP.TripLeg): string => {
  if (!isTripTimedLeg(leg)) return "N/A";
  return formatTime(leg.toStopPoint.arrivalData?.timetableTime ?? null);
};

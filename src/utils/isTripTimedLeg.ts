import * as OJP from "ojp-sdk";

/**
 * Checks if a given TripLeg is of type TripTimedLeg.
 * @param {OJP.TripLeg} leg - The TripLeg object to check.
 * @returns {leg is OJP.TripTimedLeg} - True if the leg is a TripTimedLeg, false otherwise.
 */
export function isTripTimedLeg(leg: OJP.TripLeg): leg is OJP.TripTimedLeg {
  return (
    leg &&
    leg.legType === "TimedLeg" &&
    (leg as OJP.TripTimedLeg).fromStopPoint !== undefined
  );
}

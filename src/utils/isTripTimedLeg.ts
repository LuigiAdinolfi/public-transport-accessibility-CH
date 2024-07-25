import * as OJP from "ojp-sdk";

/**
 * Type guard to check if a given TripLeg is of type TripTimedLeg.
 *
 * This function narrows the type of the provided TripLeg object to TripTimedLeg if the
 * `legType` is "TimedLeg" and the `fromStopPoint` property is defined.
 * It helps in TypeScript to ensure type safety when working with different types of `TripLeg`.
 *
 * @param {OJP.TripLeg} leg - The TripLeg object to check. It can be any leg type defined in the OJP SDK.
 * @returns {leg is OJP.TripTimedLeg} - Returns `true` if the leg is a TripTimedLeg, otherwise `false`.
 */
export function isTripTimedLeg(leg: OJP.TripLeg): leg is OJP.TripTimedLeg {
  // Check if the leg object is defined and has the correct type
  return (
    leg &&
    leg.legType === "TimedLeg" && // Verify that the legType is "TimedLeg"
    (leg as OJP.TripTimedLeg).fromStopPoint !== undefined // Check if the fromStopPoint property is defined
  );
}

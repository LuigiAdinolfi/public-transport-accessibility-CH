import * as OJP from "ojp-sdk";

/**
 * Checks if a given TripLeg is of type TripTimedLeg.
 * @param {OJP.TripLeg} leg - The TripLeg object to check.
 * @returns {leg is OJP.TripTimedLeg} - True if the leg is a TripTimedLeg, false otherwise.
 */
export function isTripTimedLeg(leg: OJP.TripLeg): leg is OJP.TripTimedLeg {
  return (leg as OJP.TripTimedLeg).fromStopPoint !== undefined;
}

/**
 * Formats a Date object to a string representation of time (HH:mm).
 * Returns 'N/A' if the input date is null or undefined.
 * @param {Date | null | undefined} date - The Date object to format.
 * @returns {string} - The formatted time string (HH:mm) or 'N/A' if date is null or undefined.
 */
export function formatTime(date: Date | null): string {
  if (!date) return "N/A";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

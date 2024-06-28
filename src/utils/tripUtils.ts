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

/**
 * Truncates a string to 20 characters.
 * Returns 'N/A' if the input string is null or undefined.
 * @param {string} value - The string to truncate.
 * @returns {string} - The truncated string or 'N/A' if value is null or undefined.
 */
export const truncateTo20Chars = (value: string): string => {
  return value && value.length > 20
    ? `${value.substring(0, 20)}`
    : value || "N/A";
};

/**
 * Truncates a string to 12 characters.
 * Returns 'N/A' if the input string is null or undefined.
 * @param {string} value - The string to truncate.
 * @returns {string} - The truncated string or 'N/A' if value is null or undefined.
 */
export const truncateTo12Chars = (value: string): string => {
  return value && value.length > 12
    ? `${value.substring(0, 12)}`
    : value || "N/A";
};

/**
 * @param {string | null | undefined} fromLocationName - The location name to handle.
 * @param {number} transferLegsLength - The length of the transfer legs.
 * @returns {string} - The formatted location name.
 */
export const handleLocation = (
  fromLocationName: string | null | undefined,
  transferLegsLength: number,
): string => {
  const defaultLocationName = fromLocationName ?? "N/A";

  let fromLocation;
  if (transferLegsLength > 3) {
    fromLocation = truncateTo12Chars(defaultLocationName);
  } else if (transferLegsLength === 2) {
    fromLocation = truncateTo20Chars(defaultLocationName);
  } else {
    fromLocation = defaultLocationName;
  }
  return fromLocation;
};

/**
 * Returns the vehicle type of given TripLeg.
 * @param {OJP.TripLeg | null} selectedTripLeg - The TripLeg object to get the vehicle type from.
 * @returns {string} - The vehicle type of the selected trip leg or 'N/A' if the leg is null.
 */
export const getVehicleType = (selectedTripLeg: OJP.TripLeg | null): string => {
  if (!selectedTripLeg) return "N/A";
  return isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.service.ptMode.name ?? "N/A"
    : "N/A";
};

/**
 * Returns the arrival time of a given TripLeg.
 * @param {OJP.TripLeg} leg - The TripLeg object to get the arrival time from.
 * @returns {string} - The arrival time of the leg or 'N/A' if the leg is not a TripTimedLeg.
 */
export const getArrivalTime = (leg: OJP.TripLeg): string => {
  if (!isTripTimedLeg(leg)) return "N/A";
  return formatTime(leg.toStopPoint.arrivalData?.timetableTime ?? null);
};

/**
 * Returns the departure time of a given TripLeg.
 * @param {OJP.TripLeg} leg - The TripLeg object to get the departure time from.
 * @returns {string} - The departure time of the leg or 'N/A' if the leg is not a TripTimedLeg.
 */
export const getDepartureTime = (leg: OJP.TripLeg): string => {
  if (!isTripTimedLeg(leg)) return "N/A";
  return formatTime(leg.fromStopPoint.departureData?.timetableTime ?? null);
};

/**
 * Returns the train number of a given TripLeg.
 * @param {OJP.TripLeg} leg - The TripLeg object to get the train number from.
 * @returns {string} - The train number of the leg or 'N/A' if the leg is not a TripTimedLeg.
 */
export const getTrainNumber = (leg: OJP.TripLeg): string => {
  if (!isTripTimedLeg(leg)) return "N/A";
  return leg.service.serviceLineNumber ?? "N/A";
};

/**
 * Returns the stop place name of a given TripLeg.
 * @param {OJP.TripLeg} leg - The TripLeg object to get the stop place name from.
 * @returns {string} - The stop place name of the leg or 'N/A' if the leg is not a TripTimedLeg.
 */
export const getStopPlaceName = (leg: OJP.TripLeg): string => {
  if (!isTripTimedLeg(leg)) return "N/A";
  return leg.service.destinationStopPlace?.stopPlaceName ?? "N/A";
};

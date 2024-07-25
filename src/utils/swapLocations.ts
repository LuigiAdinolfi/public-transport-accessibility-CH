import * as OJP from "ojp-sdk";

/**
 * Swaps the origin and destination locations.
 *
 * This function takes the current origin and destination locations and swaps them by updating
 * the origin with the destination and vice versa. It uses provided setter functions to update
 * the state of the origin and destination locations.
 *
 * @param {OJP.Location | null} origin - The current origin location. Can be null if no origin is set.
 * @param {OJP.Location | null} destination - The current destination location. Can be null if no destination is set.
 * @param {(location: OJP.Location | null) => void} setOrigin - Function to set the origin location. This function updates the state of the origin.
 * @param {(location: OJP.Location | null) => void} setDestination - Function to set the destination location. This function updates the state of the destination.
 */
export function swapLocations(
  origin: OJP.Location | null,
  destination: OJP.Location | null,
  setOrigin: (location: OJP.Location | null) => void,
  setDestination: (location: OJP.Location | null) => void,
) {
  // Temporarily store the current origin location
  const temp = origin;

  // Set the origin location to the current destination
  setOrigin(destination);

  // Set the destination location to the previously stored origin
  setDestination(temp);
}

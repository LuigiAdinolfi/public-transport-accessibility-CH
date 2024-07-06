import * as OJP from "ojp-sdk";

/**
 * Swaps the origin and destination locations.
 * @param {OJP.Location | null} origin - The current origin location.
 * @param {OJP.Location | null} destination - The current destination location.
 * @param {(location: OJP.Location | null) => void} setOrigin - Function to set the origin location.
 * @param {(location: OJP.Location | null) => void} setDestination - Function to set the destination location.
 */
export function swapLocations(
  origin: OJP.Location | null,
  destination: OJP.Location | null,
  setOrigin: (location: OJP.Location | null) => void,
  setDestination: (location: OJP.Location | null) => void,
) {
  const temp = origin;
  setOrigin(destination);
  setDestination(temp);
}

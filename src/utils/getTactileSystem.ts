import { Platform } from "@/types/Platform";

/**
 * Retrieves information about the tactile system available at a given platform.
 *
 * This function checks if tactile systems are available at the platform and returns a description if present.
 *
 * @param {Platform | null} platform - The platform object containing information about tactile systems.
 *                                      Can be null if no platform information is provided.
 * @returns {string | undefined} - A description of the tactile system if available,
 *                                  or `undefined` if tactile systems are not available or the platform is null.
 */
export default function getTactileSystem(platform: Platform | null) {
  // Check if the platform is null or if tactile system information is available
  if (platform?.tactileSystem === "YES") {
    return "Taktil-visuelle Markierung Perronfläche";
  }
  // Return undefined if tactile system information is not available or platform is null
  return undefined;
}

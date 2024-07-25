import { Platform } from "@/types/Platform";

/**
 * Determines if dynamic audio information is available at a given platform.
 *
 * @param {Platform | null} platform - The platform object containing information about dynamic audio availability.
 *                                      Can be null if no platform information is available.
 * @returns {string | undefined} - A description of the dynamic audio information if available,
 *                                  or `undefined` if dynamic audio is not available or the platform is null.
 */
export default function getDynamicAudio(platform: Platform | null) {
  let dynamicAudio;

  // Check if the platform has dynamic audio information available
  if (platform?.dynamicAudio === "YES") {
    dynamicAudio =
      "An der Haltekante sind akustische Informationen verfügbar (Lautsprecher und/oder Text-to-Speech).";
  }

  return dynamicAudio;
}

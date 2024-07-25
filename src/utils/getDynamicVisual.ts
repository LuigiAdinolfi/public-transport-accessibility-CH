import { Platform } from "@/types/Platform";

/**
 * Determines if dynamic visual displays are available at a given platform.
 *
 * @param {Platform | null} platform - The platform object containing information about dynamic visual displays.
 *                                      Can be null if no platform information is available.
 * @returns {string | undefined} - A description of the dynamic visual displays if available,
 *                                  or `undefined` if dynamic visual displays are not available or the platform is null.
 */
export default function getDynamicVisual(platform: Platform | null) {
  let dynamicVisual;

  // Check if the platform has dynamic visual displays available
  if (platform?.dynamicVisual === "YES") {
    dynamicVisual =
      "Dynamische visuelle Anzeigen sind an der Haltekante vorhanden.";
  }

  return dynamicVisual;
}

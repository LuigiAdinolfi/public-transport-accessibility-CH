import { Platform } from "@/types/Platform";

/**
 * Determines the boarding device available at a given platform.
 *
 * @param {Platform | null} platform - The platform object that includes information about boarding devices.
 *                                      Can be null if no platform information is available.
 * @returns {string | undefined} - The name of the boarding device based on the platform's boardingDevice property,
 *                                  or `undefined` if no relevant boarding device is specified.
 */
export default function getBoardingDevice(platform: Platform | null) {
  let boardingDevice;

  // Check the boardingDevice property and assign the corresponding device name
  if (platform?.boardingDevice === "LIFTS") {
    boardingDevice = "Mobilift";
  } else if (platform?.boardingDevice === "RAMPS") {
    boardingDevice = "Rampe";
  } else if (platform?.boardingDevice === "LIFTS_AND_RAMPS") {
    boardingDevice = "Hublift und Rampe";
  }

  return boardingDevice;
}

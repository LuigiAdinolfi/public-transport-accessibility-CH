import { Platform } from "@/types/Platform";

/**
 * Determines the accessibility of a platform for vehicles based on the provided platform object.
 *
 * @param {Platform | null} platform - The platform object containing vehicle access information.
 *                                      Can be null if no platform information is available.
 * @returns {string} - A string describing the accessibility of the platform:
 *                     - "autonom zugänglich" if the platform is accessible without assistance,
 *                     - "mit Personalhilfe zugänglich" if the platform requires personal assistance,
 *                     - "autonom zugänglich" if the platform is null or if no specific access information is available.
 */
export function getPlatformAccess(platform: Platform | null) {
  // Return default accessibility if the platform object is null
  if (!platform) return "autonom zugänglich";

  // Determine platform access based on the vehicleAccess property
  if (platform.vehicleAccess === "PLATFORM_ACCESS_WITHOUT_ASSISTANCE") {
    return "autonom zugänglich";
  } else if (platform.vehicleAccess === "PLATFORM_ACCESS_WITH_ASSISTANCE") {
    return "mit Personalhilfe zugänglich";
  } else {
    // Return default accessibility if vehicleAccess property is not defined
    return "autonom zugänglich";
  }
}

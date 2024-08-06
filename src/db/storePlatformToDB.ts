import { Platform } from "@/types/Platform";

/**
 * Converts an array of `Platform` objects into a format suitable for storage in a database.
 * This function maps each `Platform` object to a new object with transformed properties.
 *
 * @param {Platform[]} platformsData - An array of `Platform` objects to be converted.
 * @returns {any[]} - An array of objects formatted for database storage.
 */
export function storePlatformToDB(platformsData: Platform[]): any[] {
  // Map each Platform object to a new format suitable for database storage
  return platformsData.map((platform: Platform) => ({
    id: platform.id.toString(),
    sloid: platform.sloid,
    parentServicePointSloid: platform.parentServicePointSloid,
    boardingDevice: platform.boardingDevice,
    adviceAccessInfo: platform.adviceAccessInfo,
    additionalInformation: platform.additionalInformation,
    contrastingAreas: platform.contrastingAreas,
    dynamicAudio: platform.dynamicAudio,
    dynamicVisual: platform.dynamicVisual,
    height: platform.height,
    inclination: platform.inclination,
    inclinationLongitudinal: platform.inclinationLongitudinal,
    inclinationWidth: platform.inclinationWidth,
    infoOpportunities: platform.infoOpportunities,
    levelAccessWheelchair: platform.levelAccessWheelchair,
    partialElevation: platform.partialElevation,
    superelevation: platform.superelevation,
    tactileSystem: platform.tactileSystem,
    vehicleAccess: platform.vehicleAccess,
    wheelchairAreaLength: platform.wheelchairAreaLength,
    wheelchairAreaWidth: platform.wheelchairAreaWidth,
  }));
}

import { Platform } from "@/types/Platform";

export function storePlatformToDB(platformsData: Platform[]): any[] {
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

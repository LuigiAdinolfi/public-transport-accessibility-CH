export function storePlatformBySloidToDB(platformsBySloidData: any[]): any[] {
  return platformsBySloidData.map((platformBySloid: any) => ({
    id: platformBySloid.id.toString(),
    sloid: platformBySloid.sloid,
    parentServicePointSloid: platformBySloid.parentServicePointSloid,
    boardingDevice: platformBySloid.boardingDevice,
    adviceAccessInfo: platformBySloid.adviceAccessInfo,
    additionalInformation: platformBySloid.additionalInformation,
    contrastingAreas: platformBySloid.contrastingAreas,
    dynamicAudio: platformBySloid.dynamicAudio,
    dynamicVisual: platformBySloid.dynamicVisual,
    height: platformBySloid.height,
    inclination: platformBySloid.inclination,
    inclinationLongitudinal: platformBySloid.inclinationLongitudinal,
    inclinationWidth: platformBySloid.inclinationWidth,
    infoOpportunities: platformBySloid.infoOpportunities,
    levelAccessWheelchair: platformBySloid.levelAccessWheelchair,
    partialElevation: platformBySloid.partialElevation,
    superelevation: platformBySloid.superelevation,
    tactileSystem: platformBySloid.tactileSystem,
    vehicleAccess: platformBySloid.vehicleAccess,
    wheelchairAreaLength: platformBySloid.wheelchairAreaLength,
    wheelchairAreaWidth: platformBySloid.wheelchairAreaWidth,
  }));
}
/**
 * Platform interface
 */
export interface Platform {
  id: string;
  sloid: string;
  parentServicePointSloid: string;
  boardingDevice: string;
  adviceAccessInfo: string;
  additionalInformation: string;
  contrastingAreas: string;
  dynamicAudio: string;
  dynamicVisual: string;
  height: string;
  inclination: string;
  inclinationLongitudinal: string;
  inclinationWidth: string;
  infoOpportunities: string[];
  levelAccessWheelchair: string;
  partialElevation: string;
  superelevation: string;
  tactileSystem: string;
  vehicleAccess: string;
  wheelchairAreaLength: string;
  wheelchairAreaWidth: string;
  // Add other necessary fields
}

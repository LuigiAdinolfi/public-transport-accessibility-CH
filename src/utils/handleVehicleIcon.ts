import {
  DarkTrainProfile,
  LightTrainProfile,
} from "@/assets/icons/train-profile";
import { DarkBoatProfile, LightBoatProfile } from "@/assets/icons/boat-profile";
import { DarkBusProfile, LightBusProfile } from "@/assets/icons/bus-profile";
import {
  DarkCableCarProfile,
  LightCableCarProfile,
} from "@/assets/icons/cable-car-profile";
import { DarkCarProfile, LightCarProfile } from "@/assets/icons/car-profile";
import {
  DarkFunicularProfile,
  LightFunicularProfile,
} from "@/assets/icons/funicular-profile";
import {
  DarkRackRailwayProfile,
  LightRackRailwayProfile,
} from "@/assets/icons/rack-railway-profile";
import { DarkTramProfile, LightTramProfile } from "@/assets/icons/tram-profile";
import { DarkWalkProfile, LightWalkProfile } from "@/assets/icons/walk-profile";

const iconMap = {
  Train: {
    light: LightTrainProfile,
    dark: DarkTrainProfile,
  },
  ICE: {
    light: LightTrainProfile,
    dark: DarkTrainProfile,
  },
  EC: {
    light: LightTrainProfile,
    dark: DarkTrainProfile,
  },
  RE: {
    light: LightTrainProfile,
    dark: DarkTrainProfile,
  },
  Boat: {
    light: LightBoatProfile,
    dark: DarkBoatProfile,
  },
  Bus: {
    light: LightBusProfile,
    dark: DarkBusProfile,
  },
  CableCar: {
    light: LightCableCarProfile,
    dark: DarkCableCarProfile,
  },
  Car: {
    light: LightCarProfile,
    dark: DarkCarProfile,
  },
  Funicular: {
    light: LightFunicularProfile,
    dark: DarkFunicularProfile,
  },
  RackRailway: {
    light: LightRackRailwayProfile,
    dark: DarkRackRailwayProfile,
  },
  Tram: {
    light: LightTramProfile,
    dark: DarkTramProfile,
  },
  Wheelchair: {
    light: LightWalkProfile,
    dark: DarkWalkProfile,
  },
};

const vehicleTypeMap: { [key: string]: keyof typeof iconMap } = {
  Zug: "Train",
  Bus: "Bus",
  Tram: "Tram",
  Schiff: "Boat",
  Kabinenbahn: "CableCar",
  Auto: "Car",
  Standseilbahn: "Funicular",
  Fussweg: "Wheelchair",
  ICE: "ICE",
  EC: "EC",
  RE: "RE",
};

type Theme = "light" | "dark";
export const getVehicleIcon = (
  vehicleType: string,
  theme: string | undefined,
) => {
  const mappedType = vehicleTypeMap[vehicleType];
  if (!mappedType) {
    return null;
  }
  const vehicleIcons = iconMap[mappedType];
  return vehicleIcons ? vehicleIcons[theme as Theme] : null;
};

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

const iconMap = {
  Train: {
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
};

const vehicleTypeMap: { [key: string]: keyof typeof iconMap } = {
  Zug: "Train",
  Bus: "Bus",
  Tram: "Tram",
  // Add more vehicle types here
};

type Theme = "light" | "dark";
type VehicleType = keyof typeof iconMap;

export const getVehicleIcon = (
  vehicleType: string,
  theme: string | undefined,
) => {
  const mappedType = vehicleTypeMap[vehicleType];
  if (!mappedType) {
    console.warn(`No icon found for vehicle type: ${vehicleType}`);
    return null;
  }
  const vehicleIcons = iconMap[mappedType];
  return vehicleIcons ? vehicleIcons[theme as Theme] : null;
};

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

/**
 * A mapping of vehicle types to their corresponding light and dark theme icons.
 * @type {Object}
 */
const iconMap = {
  Train: {
    light: LightTrainProfile,
    dark: DarkTrainProfile,
  },
  ICE: {
    light: LightTrainProfile,
    dark: DarkTrainProfile,
  },
  IC: {
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
  S: {
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

/**
 * A mapping of vehicle descriptions in different languages to their corresponding key in `iconMap`.
 * @type {Object}
 */
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
  IC: "IC",
  EC: "EC",
  RE: "RE",
  S: "S",
};

type Theme = "light" | "dark";

/**
 * Retrieves the icon for a given vehicle type and theme.
 *
 * This function looks up the appropriate icon for the specified vehicle type and theme (light or dark)
 * from the `iconMap`. If the vehicle type is not found or the theme is undefined, it returns `null`.
 *
 * @param {string} vehicleType - The type of vehicle (e.g., "Bus", "Train", etc.).
 * @param {string | undefined} theme - The theme of the icon ("light" or "dark"). If undefined, the function returns `null`.
 * @returns {React.ComponentType | null} - The icon component for the vehicle type and theme, or `null` if not found.
 */
export const getVehicleIcon = (
  vehicleType: string,
  theme: string | undefined,
) => {
  // Map the vehicleType to its corresponding key in iconMap
  const mappedType = vehicleTypeMap[vehicleType];

  // If the vehicleType is not in the vehicleTypeMap, return null
  if (!mappedType) {
    return null;
  }

  // Get the icon set for the mapped vehicleType
  const vehicleIcons = iconMap[mappedType];

  // Return the icon for the specified theme, or null if not found
  return vehicleIcons ? vehicleIcons[theme as Theme] : null;
};

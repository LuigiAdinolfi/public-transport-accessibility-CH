import { DarkWheelchair, LightWheelchair } from "@/assets/icons/wheelchair";
import {
  DarkWheelchairInaccessible,
  LightWheelchairInaccessible,
} from "@/assets/icons/wheelchair-inaccessible";
import {
  DarkWheelchairPartially,
  LightWheelchairPartially,
} from "@/assets/icons/wheelchair-partially";
import {
  DarkWheelchairReservation,
  LightWheelchairReservation,
} from "@/assets/icons/wheelchair-reservation";
import {
  DarkWheelchairSubstituteTransport,
  LightWheelchairSubstituteTransport,
} from "@/assets/icons/wheelchair-substitute-transport";
import {
  DarkWheelchairUncertain,
  LightWheelchairUncertain,
} from "@/assets/icons/wheelchair-uncertain";

// Mapping of accessibility types to their corresponding icons, text descriptions, and scores.
const AccessibilityMap = {
  WheelchairUncertain: {
    light: LightWheelchairUncertain,
    dark: DarkWheelchairUncertain,
    text: "Keine Information\nvorhanden",
    score: 6,
  },
  WALK: {
    light: null,
    dark: null,
    text: "",
    score: 5,
  },
  Wheelchair: {
    light: LightWheelchair,
    dark: DarkWheelchair,
    text: "Selber\nein-/aussteigen",
    score: 4,
  },
  WheelchairPartially: {
    light: LightWheelchairPartially,
    dark: DarkWheelchairPartially,
    text: "Mit Personalhilfe\nein-/aussteigen",
    score: 3,
  },
  WheelchairReservation: {
    light: LightWheelchairReservation,
    dark: DarkWheelchairReservation,
    text: "Mit Personalhilfe\nein-/aussteigen,\nvorher anmelden",
    score: 3,
  },
  WheelchairSubstituteTransport: {
    light: LightWheelchairSubstituteTransport,
    dark: DarkWheelchairSubstituteTransport,
    text: "Mit Shuttle zur\nbarrierefreien Haltestelle,\nvorher anmelden",
    score: 1,
  },
  WheelchairInaccessible: {
    light: LightWheelchairInaccessible,
    dark: DarkWheelchairInaccessible,
    text: "Nicht rollstuhlgängig",
    score: 0,
  },
};

// Mapping of vehicle access types to accessibility map keys.
const accessibilityTypeMap: { [key: string]: keyof typeof AccessibilityMap } = {
  PLATFORM_ACCESS_WITHOUT_ASSISTANCE: "Wheelchair",
  PLATFORM_NOT_WHEELCHAIR_ACCESSIBLE: "WheelchairInaccessible",
  PLATFORM_ACCESS_WITH_ASSISTANCE: "WheelchairPartially",
  PLATFORM_ACCESS_WITH_ASSISTANCE_WHEN_NOTIFIED: "WheelchairReservation",
  ALTERNATIVE_TRANSPORT: "WheelchairSubstituteTransport",
  TO_BE_COMPLETED: "WheelchairUncertain",
  NO_DATA: "WheelchairUncertain",
  null: "WheelchairUncertain",
  WHEELCHAIR_RESERVATION: "WheelchairReservation",
  WALK: "WALK",
};

// Mapping of full description text to accessibility map keys.
const fullDescriptionMap: { [key: string]: string } = {
  "Stufenloser Zugang, Ein-/Ausstieg durch Personalhilfestellung, Voranmeldung n\u00F6tig.":
    "WHEELCHAIR_RESERVATION",
  "Haltekante nicht autonom benutzbar": "PLATFORM_NOT_WHEELCHAIR_ACCESSIBLE",
  "Haltekante autonom benutzbar": "PLATFORM_ACCESS_WITHOUT_ASSISTANCE",
};

// Type for the theme, which can be 'light' or 'dark'.
type Theme = "light" | "dark";

/**
 * Retrieves the accessibility icon and details based on the vehicle access type and theme.
 *
 * @param {string} vehicleAccess - The vehicle access type description.
 * @param {string | undefined} theme - The theme to use for the icon ('light' or 'dark').
 * @returns {{ icon: React.ComponentType | null; text: string; score: number } | null} -
 *          An object containing the icon component, text description, and score for the accessibility type, or null if no icon is found.
 */
export const getAccessIcon = (
  vehicleAccess: string,
  theme: string | undefined,
) => {
  // Map vehicle access description to an accessibility type
  const mappedType =
    accessibilityTypeMap[fullDescriptionMap[vehicleAccess] || vehicleAccess];

  // Return null if the mapped type is not found
  if (!mappedType) {
    return null;
  }

  // Retrieve the icons and details for the mapped accessibility type
  const vehicleAccessIcons = AccessibilityMap[mappedType];
  return vehicleAccessIcons
    ? {
        icon: vehicleAccessIcons[theme as Theme],
        text: vehicleAccessIcons.text,
        score: vehicleAccessIcons.score,
      }
    : null;
};

/**
 * Retrieves the accessibility icon based on the text description and theme.
 *
 * @param {string | undefined} text - The text description of the accessibility feature.
 * @param {string | undefined} theme - The theme to use for the icon ('light' or 'dark').
 * @returns {React.ComponentType | null} - The icon component that matches the text description and theme, or null if no match is found.
 */
export function getAccessibilityIconByText(
  text: string | undefined,
  theme: string | undefined,
) {
  if (text === "Selber\nein-/aussteigen") {
    return theme === "dark" ? DarkWheelchair : LightWheelchair;
  } else if (text === "Mit Personalhilfe\nein-/aussteigen") {
    return theme === "dark"
      ? DarkWheelchairPartially
      : LightWheelchairPartially;
  } else if (text === "Mit Personalhilfe\nein-/aussteigen,\nvorher anmelden") {
    return theme === "dark"
      ? DarkWheelchairReservation
      : LightWheelchairReservation;
  } else if (
    text === "Mit Shuttle zur\nbarrierefreien Haltestelle,\nvorher anmelden"
  ) {
    return theme === "dark"
      ? DarkWheelchairSubstituteTransport
      : LightWheelchairSubstituteTransport;
  } else if (text === "Nicht rollstuhlgängig") {
    return theme === "dark"
      ? DarkWheelchairInaccessible
      : LightWheelchairInaccessible;
  } else {
    return theme === "dark"
      ? DarkWheelchairUncertain
      : LightWheelchairUncertain;
  }
}

/**
 * Determines the worst accessibility icon between two locations based on their accessibility scores.
 *
 * @param {Object | null} accessIconFromLocationProps - The accessibility icon and details for the starting location.
 * @param {Object | null} accessIconToLocationProps - The accessibility icon and details for the destination location.
 * @returns {{ icon: React.ComponentType | null; text: string; score: number } | null} -
 *          The icon with the lower score, indicating worse accessibility, or null if either icon is missing.
 */
export const getWorstIcon = (
  accessIconFromLocationProps: {
    icon: any;
    text: string;
    score: number;
  } | null,
  accessIconToLocationProps: { icon: any; text: string; score: number } | null,
) => {
  // Return null if either icon data is missing
  if (!accessIconFromLocationProps || !accessIconToLocationProps) {
    return null;
  }

  // Return the icon with the lower score
  return accessIconFromLocationProps.score < accessIconToLocationProps.score
    ? accessIconFromLocationProps
    : accessIconToLocationProps;
};

/**
 * Determines the worst accessibility icon among multiple connections based on their accessibility scores.
 *
 * Compares the worst accessibility icons from the first and last legs of a journey and returns the one with the lower score.
 *
 * @param {Object | null} accessIconFromLocationFirstLeg - The accessibility icon and details for the starting location of the first leg.
 * @param {Object | null} accessIconToLocationFirstLeg - The accessibility icon and details for the destination location of the first leg.
 * @param {Object | null} accessIconFromLocationLastLeg - The accessibility icon and details for the starting location of the last leg.
 * @param {Object | null} accessIconToLocationLastLeg - The accessibility icon and details for the destination location of the last leg.
 * @returns {{ icon: React.ComponentType | null; text: string; score: number } | null} -
 *          The icon with the worst accessibility score among the connections, or null if no icon data is available.
 */
export const getWorstIconMultipleConnections = (
  accessIconFromLocationFirstLeg: {
    icon: any;
    text: string;
    score: number;
  } | null,
  accessIconToLocationFirstLeg: {
    icon: any;
    text: string;
    score: number;
  } | null,
  accessIconFromLocationLastLeg: {
    icon: any;
    text: string;
    score: number;
  } | null,
  accessIconToLocationLastLeg: {
    icon: any;
    text: string;
    score: number;
  } | null,
) => {
  // Extract scores or default to 0 if data is missing
  const firstLegScore = accessIconFromLocationFirstLeg?.score ?? 0;
  const lastLegScore = accessIconFromLocationLastLeg?.score ?? 0;

  // Determine the worst icon for the first leg
  const firstLegWorst =
    firstLegScore < (accessIconToLocationFirstLeg?.score ?? 0)
      ? accessIconFromLocationFirstLeg
      : accessIconToLocationFirstLeg;

  // Determine the worst icon for the last leg
  const lastLegWorst =
    lastLegScore < (accessIconToLocationLastLeg?.score ?? 0)
      ? accessIconFromLocationLastLeg
      : accessIconToLocationLastLeg;

  // Compare the worst icons from the first and last legs
  const firstLegWorstScore = firstLegWorst?.score ?? 0;
  const lastLegWorstScore = lastLegWorst?.score ?? 0;

  return firstLegWorstScore < lastLegWorstScore ? firstLegWorst : lastLegWorst;
};

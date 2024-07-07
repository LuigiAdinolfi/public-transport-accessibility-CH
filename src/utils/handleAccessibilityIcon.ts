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

const AccessibilityMap = {
  WALK: {
    light: LightWheelchair,
    dark: DarkWheelchair,
    text: "Selber fahren",
    score: 6,
  },
  Wheelchair: {
    light: LightWheelchair,
    dark: DarkWheelchair,
    text: "Selber\nein-/aussteigen",
    score: 5,
  },
  WheelchairPartially: {
    light: LightWheelchairPartially,
    dark: DarkWheelchairPartially,
    text: "Mit Hilfe Fahrpersonal\nein-/aussteigen",
    score: 4,
  },
  WheelchairReservation: {
    light: LightWheelchairReservation,
    dark: DarkWheelchairReservation,
    text: "Mit Personalhilfe ein-/aussteigen, vorher anmelden",
    score: 3,
  },
  WheelchairSubstituteTransport: {
    light: LightWheelchairSubstituteTransport,
    dark: DarkWheelchairSubstituteTransport,
    text: "Mit Shuttle zur barrierefreien Haltestelle, vorher anmelden",
    score: 2,
  },
  WheelchairUncertain: {
    light: LightWheelchairUncertain,
    dark: DarkWheelchairUncertain,
    text: "Keine Information\nvorhanden",
    score: 1,
  },
  WheelchairInaccessible: {
    light: LightWheelchairInaccessible,
    dark: DarkWheelchairInaccessible,
    text: "Nicht rollstuhlgängig",
    score: 0,
  },
};

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

const fullDescriptionMap: { [key: string]: string } = {
  "Stufenloser Zugang, Ein-/Ausstieg durch Personalhilfestellung, Voranmeldung n\u00F6tig.":
    "WHEELCHAIR_RESERVATION",
  "Haltekante nicht autonom benutzbar": "PLATFORM_NOT_WHEELCHAIR_ACCESSIBLE",
  "Haltekante autonom benutzbar": "PLATFORM_ACCESS_WITHOUT_ASSISTANCE",
};

type Theme = "light" | "dark";

export const getAccessIcon = (
  vehicleAccess: string,
  theme: string | undefined,
) => {
  const mappedType =
    accessibilityTypeMap[fullDescriptionMap[vehicleAccess] || vehicleAccess];
  if (!mappedType) {
    return null;
  }
  const vehicleAccessIcons = AccessibilityMap[mappedType];
  return vehicleAccessIcons
    ? {
        icon: vehicleAccessIcons[theme as Theme],
        text: vehicleAccessIcons.text,
        score: vehicleAccessIcons.score,
      }
    : null;
};

export const getWorstIcon = (
  accessIconFromLocationProps: {
    icon: any;
    text: string;
    score: number;
  } | null,
  accessIconToLocationProps: { icon: any; text: string; score: number } | null,
) => {
  if (!accessIconFromLocationProps || !accessIconToLocationProps) {
    return null;
  }
  return accessIconFromLocationProps.score < accessIconToLocationProps.score
    ? accessIconFromLocationProps
    : accessIconToLocationProps;
};

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
  const firstLegScore = accessIconFromLocationFirstLeg?.score ?? 0;
  const lastLegScore = accessIconFromLocationLastLeg?.score ?? 0;

  const firstLegWorst =
    firstLegScore < (accessIconToLocationFirstLeg?.score ?? 0)
      ? accessIconFromLocationFirstLeg
      : accessIconToLocationFirstLeg;

  const lastLegWorst =
    lastLegScore < (accessIconToLocationLastLeg?.score ?? 0)
      ? accessIconFromLocationLastLeg
      : accessIconToLocationLastLeg;

  const firstLegWorstScore = firstLegWorst?.score ?? 0;
  const lastLegWorstScore = lastLegWorst?.score ?? 0;

  return firstLegWorstScore < lastLegWorstScore ? firstLegWorst : lastLegWorst;
};

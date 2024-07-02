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
  WheelchairUncertain: {
    light: LightWheelchairUncertain,
    dark: DarkWheelchairUncertain,
    text: "Keine Information vorhanden",
    score: 5,
  },
  Wheelchair: {
    light: LightWheelchair,
    dark: DarkWheelchair,
    text: "Selber ein-/aussteigen",
    score: 4,
  },
  WheelchairPartially: {
    light: LightWheelchairPartially,
    dark: DarkWheelchairPartially,
    text: "Mit Hilfe Fahrpersonal ein-/aussteigen",
    score: 3,
  },
  WheelchairReservation: {
    light: LightWheelchairReservation,
    dark: DarkWheelchairReservation,
    text: "Mit Personalhilfe ein-/aussteigen, vorher anmelden",
    score: 2,
  },
  WheelchairSubstituteTransport: {
    light: LightWheelchairSubstituteTransport,
    dark: DarkWheelchairSubstituteTransport,
    text: "Mit Shuttle zur barrierefreien Haltestelle, vorher anmelden",
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
};

type Theme = "light" | "dark";
export const getAccessIcon = (
  vehicleAccess: string,
  theme: string | undefined,
) => {
  const mappedType = accessibilityTypeMap[vehicleAccess];
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

// How to use the functions
// const icons = allLegs.map(leg => getVehicleIcon(getVehicleType(leg), resolvedTheme)).filter(icon => icon !== null);
// const bestIcon = getBestIcon(icons);
// const worstIcon = getWorstIcon(icons);

// {worstIcon.icon && <worstIcon.icon className="h-6 w-6" />}
// {!isMobile && (
//   <div className="pl-2 md:text-base">
//     {worstIcon.text}
//     </div>
// )}

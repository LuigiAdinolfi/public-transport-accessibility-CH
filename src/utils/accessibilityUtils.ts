import { DarkWheelchair, LightWheelchair } from "@/assets/icons/wheelchair";
import { LightWheelchairInaccessible } from "@/assets/icons/wheelchair-inaccessible";
import { LightWheelchairPartially } from "@/assets/icons/wheelchair-partially";
import { LightWheelchairReservation } from "@/assets/icons/wheelchair-reservation";
import { LightWheelchairSubstituteTransport } from "@/assets/icons/wheelchair-substitute-transport";
import {
  DarkWheelchairUncertain,
  LightWheelchairUncertain,
} from "@/assets/icons/wheelchair-uncertain";

const AccessibilityMap = {
  Wheelchair: {
    light: LightWheelchair,
    dark: DarkWheelchair,
    text: "Selber ein-/aussteigen",
    score: 5,
  },
  WheelchairPartially: {
    light: LightWheelchairPartially,
    dark: LightWheelchairPartially,
    text: "Mit Hilfe Fahrpersonal ein-/aussteigen",
    score: 4,
  },
  WheelchairReservation: {
    light: LightWheelchairReservation,
    dark: LightWheelchairReservation,
    text: "Mit Personalhilfe ein-/aussteigen, vorher anmelden",
    score: 3,
  },
  WheelchairSubstituteTransport: {
    light: LightWheelchairSubstituteTransport,
    dark: LightWheelchairSubstituteTransport,
    text: "Mit Shuttle zur barrierefreien Haltestelle, vorher anmelden",
    score: 2,
  },
  WheelchairUncertain: {
    light: LightWheelchairUncertain,
    dark: DarkWheelchairUncertain,
    text: "Keine Information vorhanden",
    score: 1,
  },
  WheelchairInaccessible: {
    light: LightWheelchairInaccessible,
    dark: LightWheelchairInaccessible,
    text: "Nicht rollstuhlgängig",
    score: 0,
  },
};

const accessibilityTypeMap: { [key: string]: keyof typeof AccessibilityMap } = {
  PLATFORM_ACCESS_WITHOUT_ASSISTANCE: "Wheelchair",
  PLATFORM_NOT_WHEELCHAIR_ACCESSIBLE: "WheelchairInaccessible",
  PLATFORM_ACCESS_WITH_ASSISTANCE: "WheelchairPartially",
  PLATFORM_ACCESS_WITH_ASSISTANCE_WHEN_NOTIFIED: "WheelchairReservation",
  TO_BE_COMPLETED: "WheelchairSubstituteTransport",
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

export const getBestIcon = (
  icons: Array<{ icon: any; text: string; score: number }>,
) => {
  return icons.reduce((prev, current) =>
    current.score > prev.score ? current : prev,
  );
};

export const getWorstIcon = (
  icons: Array<{ icon: any; text: string; score: number }>,
) => {
  return icons.reduce((prev, current) =>
    current.score < prev.score ? current : prev,
  );
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

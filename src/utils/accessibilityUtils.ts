import { DarkWheelchair, LightWheelchair } from "@/assets/icons/wheelchair";
import { LightWheelchairInaccessible } from "@/assets/icons/wheelchair-inaccessible";
import { LightWheelchairPartially } from "@/assets/icons/wheelchair-partially";
import { LightWheelchairReservation } from "@/assets/icons/wheelchair-reservation";
import { LightWheelchairSubstituteTransport } from "@/assets/icons/wheelchair-substitute-transport";

const AccessibilityMap = {
  Wheelchair: {
    light: LightWheelchair,
    dark: DarkWheelchair,
    text: "Selber ein-/aussteigen",
  },
  WheelchairInaccessible: {
    light: LightWheelchairInaccessible,
    dark: LightWheelchairInaccessible,
    text: "Nicht rollstuhlgängig",
  },
  WheelchairPartially: {
    light: LightWheelchairPartially,
    dark: LightWheelchairPartially,
    text: "Mit Hilfe Fahrpersonal ein-/aussteigen",
  },
  WheelchairReservation: {
    light: LightWheelchairReservation,
    dark: LightWheelchairReservation,
    text: "Mit Personalhilfe ein-/aussteigen, vorher anmelden",
  },
  WheelchairSubstituteTransport: {
    light: LightWheelchairSubstituteTransport,
    dark: LightWheelchairSubstituteTransport,
    text: "Mit Shuttle zur barrierefreien Haltestelle, vorher anmelden",
  },
};

const accessibilityTypeMap: { [key: string]: keyof typeof AccessibilityMap } = {
  PLATFORM_ACCESS_WITHOUT_ASSISTANCE: "Wheelchair",
  PLATFORM_NOT_WHEELCHAIR_ACCESSIBLE: "WheelchairInaccessible",
  PLATFORM_ACCESS_WITH_ASSISTANCE: "WheelchairPartially",
  PLATFORM_ACCESS_WITH_ASSISTANCE_WHEN_NOTIFIED: "WheelchairReservation",
  TO_BE_COMPLETED: "WheelchairSubstituteTransport",
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
      }
    : null;
};

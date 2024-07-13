import { Platform } from "@/types/Platform";

export function getPlatformAccess(platform: Platform | null): string {
  if (!platform) return "Haltekante autonom benutzbar";
  if (platform.vehicleAccess === "PLATFORM_ACCESS_WITHOUT_ASSISTANCE") {
    return "Haltekante autonom benutzbar";
  } else if (platform.vehicleAccess === "PLATFORM_ACCESS_WITH_ASSISTANCE") {
    return "Haltekante mit Assistenz benutzbar";
  } else {
    return "Haltekante autonom benutzbar";
  }
}

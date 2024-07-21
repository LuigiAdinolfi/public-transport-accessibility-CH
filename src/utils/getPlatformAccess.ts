import { Platform } from "@/types/Platform";

export function getPlatformAccess(platform: Platform | null): string {
  if (!platform) return "autonom zugänglich";
  if (platform.vehicleAccess === "PLATFORM_ACCESS_WITHOUT_ASSISTANCE") {
    return "autonom zugänglich";
  } else if (platform.vehicleAccess === "PLATFORM_ACCESS_WITH_ASSISTANCE") {
    return "mit Personalhilfe zugänglich";
  } else {
    return "autonom zugänglich";
  }
}

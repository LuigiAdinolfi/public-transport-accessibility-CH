import { getPlatformAccess } from "./getPlatformAccess";
import { Platform } from "@/types/Platform";

describe("getPlatformAccess", () => {
  it("should return 'autonom zugänglich' if platform is null", () => {
    expect(getPlatformAccess(null)).toBe("autonom zugänglich");
  });

  it("should return 'autonom zugänglich' if vehicleAccess is 'PLATFORM_ACCESS_WITHOUT_ASSISTANCE'", () => {
    const platform: Platform = {
      vehicleAccess: "PLATFORM_ACCESS_WITHOUT_ASSISTANCE",
    } as Platform;
    expect(getPlatformAccess(platform)).toBe("autonom zugänglich");
  });

  it("should return 'mit Personalhilfe zugänglich' if vehicleAccess is 'PLATFORM_ACCESS_WITH_ASSISTANCE'", () => {
    const platform: Platform = {
      vehicleAccess: "PLATFORM_ACCESS_WITH_ASSISTANCE",
    } as Platform;
    expect(getPlatformAccess(platform)).toBe("mit Personalhilfe zugänglich");
  });

  it("should return 'autonom zugänglich' if vehicleAccess is an unknown value", () => {
    const platform: Platform = {
      vehicleAccess: "UNKNOWN_ACCESS_TYPE",
    } as Platform;
    expect(getPlatformAccess(platform)).toBe("autonom zugänglich");
  });

  it("should return 'autonom zugänglich' if vehicleAccess is not defined", () => {
    const platform: Platform = {} as Platform;
    expect(getPlatformAccess(platform)).toBe("autonom zugänglich");
  });
});

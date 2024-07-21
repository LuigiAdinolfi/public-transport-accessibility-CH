import { Platform } from "@/types/Platform";

export default function getBoardingDevice(platform: Platform | null) {
  let boardingDevice;
  if (platform?.boardingDevice === "LIFTS") {
    boardingDevice = "Mobilift";
  } else if (platform?.boardingDevice === "RAMPS") {
    boardingDevice = "Rampe";
  } else if (platform?.boardingDevice === "LIFTS_AND_RAMPS") {
    boardingDevice = "Hublift und Rampe";
  }
  return boardingDevice;
}

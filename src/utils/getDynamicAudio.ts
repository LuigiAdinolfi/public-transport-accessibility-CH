import { Platform } from "@/types/Platform";

export default function getDynamicAudio(platform: Platform | null) {
  let dynamicAudio;
  if (platform?.dynamicAudio === "YES") {
    dynamicAudio =
      "An der Haltekante sind akustische Informationen verfügbar (Lautsprecher und/oder Text-to-Speech).";
  }
  return dynamicAudio;
}

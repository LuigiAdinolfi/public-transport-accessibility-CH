import { Platform } from "@/types/Platform";

export default function getDynamicVisual(platform: Platform | null) {
  let dynamicVisual;
  if (platform?.dynamicVisual === "YES") {
    dynamicVisual =
      "Dynamische visuelle Anzeigen sind an der Haltekante vorhanden.";
  }
  return dynamicVisual;
}

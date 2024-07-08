import { Platform } from "@/types/Platform";

export default function getTactileSystem(platform: Platform | null) {
  let tactileSystem;
  if (platform?.tactileSystem === "YES") {
    tactileSystem = "Taktil-visuelle Markierung Perronfläche";
  }
  return tactileSystem;
}
import { useEffect, useState } from "react";
import * as OJP from "ojp-sdk";
import {
  getFromStopPointVehicleAccess,
  getToStopPointVehicleAccess,
} from "@/utils/handleLocation";

export function useFromStopPointVehicleAccessType(
  selectedTripLeg: OJP.TripLeg,
) {
  const [vehicleAccessType, setVehicleAccessType] = useState<string>("");

  useEffect(() => {
    async function fetchVehicleAccessType() {
      const accessType = await getFromStopPointVehicleAccess(selectedTripLeg);
      if (vehicleAccessType !== accessType) {
        setVehicleAccessType(accessType);
      }
    }

    if (selectedTripLeg) {
      fetchVehicleAccessType().then((r) => r);
    }
  }, [selectedTripLeg]);

  return vehicleAccessType;
}

export function useToStopPointVehicleAccessType(selectedTripLeg: OJP.TripLeg) {
  const [vehicleAccessType, setVehicleAccessType] = useState<string>("");

  useEffect(() => {
    async function fetchVehicleAccessType() {
      const accessType = await getToStopPointVehicleAccess(selectedTripLeg);
      if (vehicleAccessType !== accessType) {
        setVehicleAccessType(accessType);
      }
    }

    if (selectedTripLeg) {
      fetchVehicleAccessType().then((r) => r);
    }
  }, [selectedTripLeg]);

  return vehicleAccessType;
}

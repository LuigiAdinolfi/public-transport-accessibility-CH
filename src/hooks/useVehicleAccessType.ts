import { useEffect, useState } from "react";
import * as OJP from "ojp-sdk";
import {
  getStopPointVehicleAccessFromDestination,
  getStopPointVehicleAccessFromOrigin,
} from "@/utils/getStopPointVehicleAccess";

export function useFromStopPointVehicleAccessType(
  selectedTripLeg: OJP.TripLeg,
) {
  const [vehicleAccessType, setVehicleAccessType] = useState<string>("");

  useEffect(() => {
    async function fetchVehicleAccessType() {
      const accessType =
        await getStopPointVehicleAccessFromOrigin(selectedTripLeg);
      if (vehicleAccessType !== accessType) {
        setVehicleAccessType(accessType);
      }
    }

    if (selectedTripLeg) {
      fetchVehicleAccessType().then((r) => r);
    }
  }, [vehicleAccessType, selectedTripLeg]);

  return vehicleAccessType;
}

export function useToStopPointVehicleAccessType(selectedTripLeg: OJP.TripLeg) {
  const [vehicleAccessType, setVehicleAccessType] = useState<string>("");

  useEffect(() => {
    async function fetchVehicleAccessType() {
      const accessType =
        await getStopPointVehicleAccessFromDestination(selectedTripLeg);
      if (vehicleAccessType !== accessType) {
        setVehicleAccessType(accessType);
      }
    }

    if (selectedTripLeg) {
      fetchVehicleAccessType().then((r) => r);
    }
  }, [vehicleAccessType, selectedTripLeg]);

  return vehicleAccessType;
}

import { useEffect, useState } from "react";
import * as OJP from "ojp-sdk";
import {
  getStopPointVehicleAccessFromDestination,
  getStopPointVehicleAccessFromOrigin,
} from "@/utils/getStopPointVehicleAccess";

/**
 * Custom hook to fetch and manage the vehicle access type from the origin stop point of a selected trip leg.
 *
 * This hook retrieves the vehicle access type from the origin stop point of a trip leg and updates the state accordingly.
 *
 * @param {OJP.TripLeg} selectedTripLeg - The selected trip leg containing information about the origin stop point.
 * @returns {string} - The vehicle access type from the origin stop point.
 */
export function useFromStopPointVehicleAccessType(
  selectedTripLeg: OJP.TripLeg,
) {
  const [vehicleAccessType, setVehicleAccessType] = useState<string>("");

  useEffect(() => {
    async function fetchVehicleAccessType() {
      // Fetch vehicle access type from the origin stop point
      const accessType =
        await getStopPointVehicleAccessFromOrigin(selectedTripLeg);
      // Update state only if the fetched access type is different from the current state
      if (vehicleAccessType !== accessType) {
        setVehicleAccessType(accessType);
      }
    }

    // Fetch vehicle access type if a trip leg is selected
    if (selectedTripLeg) {
      fetchVehicleAccessType().then((r) => r);
    }
  }, [vehicleAccessType, selectedTripLeg]); // Dependencies: re-run effect if `vehicleAccessType` or `selectedTripLeg` changes

  return vehicleAccessType;
}

/**
 * Custom hook to fetch and manage the vehicle access type from the destination stop point of a selected trip leg.
 *
 * This hook retrieves the vehicle access type from the destination stop point of a trip leg and updates the state accordingly.
 *
 * @param {OJP.TripLeg} selectedTripLeg - The selected trip leg containing information about the destination stop point.
 * @returns {string} - The vehicle access type from the destination stop point.
 */
export function useToStopPointVehicleAccessType(selectedTripLeg: OJP.TripLeg) {
  const [vehicleAccessType, setVehicleAccessType] = useState<string>("");

  useEffect(() => {
    async function fetchVehicleAccessType() {
      // Fetch vehicle access type from the destination stop point
      const accessType =
        await getStopPointVehicleAccessFromDestination(selectedTripLeg);
      // Update state only if the fetched access type is different from the current state
      if (vehicleAccessType !== accessType) {
        setVehicleAccessType(accessType);
      }
    }

    // Fetch vehicle access type if a trip leg is selected
    if (selectedTripLeg) {
      fetchVehicleAccessType().then((r) => r);
    }
  }, [vehicleAccessType, selectedTripLeg]); // Dependencies: re-run effect if `vehicleAccessType` or `selectedTripLeg` changes

  return vehicleAccessType;
}

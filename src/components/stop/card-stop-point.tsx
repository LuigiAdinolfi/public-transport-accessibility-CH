import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { useMediaQuery } from "react-responsive";
import { useJourneyStore } from "@/store/useJourneyStore";
import { TripLeg } from "ojp-sdk";
import FeatureList from "@/components/stop/feature-list";
import AccordionSections from "@/components/stop/accordion-sections";
import InfoSection from "@/components/stop/info-section";
import { getVehicleIcon } from "@/utils/handleVehicleIcon";
import { getVehicleType } from "@/utils/getVehicleType";
import { getCachedParkingLot } from "@/cache/getCachedParkingLot";
import { useParkingLotStore } from "@/store/useParkingLotStore";
import { getCachedStopPoint } from "@/cache/getCachedStopPoint";
import { useStopPointStore } from "@/store/useStopPointStore";

/**
 * Component displaying detailed information about a stop point in a card format.
 * @returns {React.ReactElement} - CardStopPoint component.
 */
export default function CardStopPoint(): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { selectedStop, selectedTripLeg } = useJourneyStore();
  const { parentServicePointSloid, setParkingLot } = useParkingLotStore();
  const { setStopPoint } = useStopPointStore();
  const parentSloid = parentServicePointSloid;

  // Determine vehicle type based on selected trip leg
  let vehicleType = "N/A";
  if (selectedTripLeg instanceof TripLeg) {
    vehicleType = getVehicleType(selectedTripLeg);
  }
  const VehicleIcon = getVehicleIcon(vehicleType, resolvedTheme);

  useEffect(() => {
    if (!parentSloid) return;

    async function fetchParkingLot() {
      try {
        const parkingLot = await getCachedParkingLot(parentSloid);
        setParkingLot(parkingLot); // Set parkingLot state regardless of null or not
      } catch (error) {
        console.error("Error fetching parking lot:", error);
      }
    }

    async function fetchStopPoint() {
      try {
        const stopPoint = await getCachedStopPoint(parentSloid);
        setStopPoint(stopPoint); // Set stopPoint state regardless of null or not
      } catch (error) {
        console.error("Error fetching stop point:", error);
        setStopPoint(null);
      }
    }

    fetchParkingLot().then((r) => r);
    fetchStopPoint().then((r) => r);
  }, [parentSloid]);

  return (
    <Card className="mt-3">
      {/* Header Section */}
      <div
        className={`flex flex-row items-center space-y-1.5 ${!isMobile ? "px-14 pb-6 pt-8" : "px-8 pb-2 pt-4"}`}
      >
        {/* Stop name */}
        <h1 className="items-center text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {selectedStop}
        </h1>
        {/* Vehicle type and icon */}
        <div
          className={`flex items-center pb-1.5 ${!isMobile ? "pl-16" : "pl-8"}`}
        >
          <div className="pr-2 text-base font-normal">{vehicleType}</div>
          <div className="text-base font-normal">
            {VehicleIcon && <VehicleIcon className="h-6 w-6" />}
          </div>
        </div>
      </div>

      {/* Feature List Section */}
      <FeatureList />

      {/* Accordion Sections */}
      <AccordionSections />

      {/* Info Section */}
      <InfoSection />
    </Card>
  );
}

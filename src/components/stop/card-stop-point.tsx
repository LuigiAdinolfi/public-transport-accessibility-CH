import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { useMediaQuery } from "react-responsive";
import { useJourneyStore } from "@/store/useJourneyStore";
import FeatureList from "@/components/stop/feature-list";
import AccordionSections from "@/components/stop/accordion-sections";
import InfoSection from "@/components/stop/info-section";
import { getVehicleIcon } from "@/utils/handleVehicleIcon";
import { getVehicleType } from "@/utils/getVehicleType";
import { getCachedParkingLot } from "@/cache/getCachedParkingLot";
import { useParkingLotStore } from "@/store/useParkingLotStore";
import { getCachedStopPoint } from "@/cache/getCachedStopPoint";
import { useStopPointStore } from "@/store/useStopPointStore";
import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/**
 * Component displaying detailed information about a stop point in a card format.
 * @returns {React.ReactElement} - CardStopPoint component.
 */
export default function CardStopPoint(): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { selectedStop, selectedTripLeg, setSelectedTripLeg } =
    useJourneyStore();
  const { parentServicePointSloid, setParkingLot } = useParkingLotStore();
  const { stopPoint, setStopPoint } = useStopPointStore();
  const parentSloid = parentServicePointSloid;
  const router = useRouter();

  // Restore selectedTripLeg from localStorage if it exists
  useEffect(() => {
    const savedTripLeg = localStorage.getItem("selectedTripLeg");
    if (savedTripLeg) {
      setSelectedTripLeg(JSON.parse(savedTripLeg));
    }
  }, [setSelectedTripLeg]);

  // Determine vehicle type based on selected trip leg
  let vehicleType = "N/A";
  if (selectedTripLeg) {
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
      }
    }

    fetchParkingLot().then((r) => r);
    fetchStopPoint().then((r) => r);
  }, [parentSloid, setParkingLot, setStopPoint]);

  const interop = stopPoint.interoperable;

  const interoperable = interop
    ? "Haltestelle ist komplett autonom benutzbar"
    : "Haltestelle ist nicht autonom benutzbar";

  return (
    <Card className="mt-3">
      {/* Header Section */}
      <div
        className={`flex flex-row items-center justify-between space-y-1.5 align-middle ${!isMobile ? "px-14 pb-8 pt-8" : "px-8 pb-2 pt-4"}`}
      >
        {/* Stop name */}
        <div className="flex items-center">
          <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {selectedStop}
          </div>
          {/* Vehicle type and icon */}
          <div className={`flex items-center ${!isMobile ? "pl-8" : "pl-8"}`}>
            <div className="pr-2 text-base font-normal">{vehicleType}</div>
            <div className="text-base font-normal">
              {VehicleIcon && <VehicleIcon className="h-6 w-6" />}
            </div>
          </div>
        </div>

        {interoperable && (
          <div className="flex items-center pb-1.5">
            <div className="text-lg font-semibold">{interoperable}</div>
          </div>
        )}
        <Button
          className="ml-4 h-12 md:text-base"
          variant="outline"
          onClick={() => router.push("/select/details/stop")}
        >
          Bahnhofsplan
          <Map className="ml-2 h-4 w-4" />
        </Button>
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

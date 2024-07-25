import React, { useCallback, useEffect } from "react";
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
  const vehicleType = selectedTripLeg ? getVehicleType(selectedTripLeg) : "N/A";
  const VehicleIcon = getVehicleIcon(vehicleType, resolvedTheme);

  const fetchParkingLot = useCallback(async () => {
    if (!parentSloid) return;
    try {
      const parkingLot = await getCachedParkingLot(parentSloid);
      setParkingLot(parkingLot);
    } catch (error) {
      console.error("Error fetching parking lot:", error);
    }
  }, [parentSloid, setParkingLot]);

  const fetchStopPoint = useCallback(async () => {
    if (!parentSloid) return;
    try {
      const stopPoint = await getCachedStopPoint(parentSloid);
      setStopPoint(stopPoint);
    } catch (error) {
      console.error("Error fetching stop point:", error);
    }
  }, [parentSloid, setStopPoint]);

  useEffect(() => {
    fetchParkingLot().then((r) => r);
    fetchStopPoint().then((r) => r);
  }, [fetchParkingLot, fetchStopPoint]);

  const interop = stopPoint?.interoperable;

  const interoperableMessage = interop
    ? "Haltestelle ist komplett autonom benutzbar"
    : "Haltestelle ist nicht autonom benutzbar";

  return (
    <Card className="mt-3">
      <div
        className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center justify-between space-y-1.5 px-8 pt-4 align-middle ${!isMobile && "px-14 pb-8"}`}
      >
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {selectedStop}
          </h1>
          <div className="flex items-center pl-8">
            <div className="pr-2 text-base font-normal">{vehicleType}</div>
            {VehicleIcon && <VehicleIcon className="h-6 w-6" />}
          </div>
        </div>

        {interop !== undefined && (
          <h2 className="flex items-center p-1.5">
            <div
              className={`text-lg font-semibold ${isMobile ? "text-center" : ""}`}
            >
              {interoperableMessage}
            </div>
          </h2>
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

      <FeatureList />
      <AccordionSections />
      <InfoSection />
    </Card>
  );
}

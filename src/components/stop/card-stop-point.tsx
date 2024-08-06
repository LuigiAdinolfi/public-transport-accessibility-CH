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
import { fetchAndCacheParkingLotData } from "@/cache/fetchAndCacheParkingLotData";
import { useParkingLotStore } from "@/store/useParkingLotStore";
import { fetchAndCacheStopPointData } from "@/cache/fetchAndCacheStopPointData";
import { useStopPointStore } from "@/store/useStopPointStore";
import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/**
 * Component displaying detailed information about a stop point in a card format.
 * It includes the stop name, vehicle type, a button to view the station map, and additional information sections.
 * The component also manages data fetching for parking lot and stop point details.
 *
 * @returns {React.ReactElement} - The CardStopPoint component.
 */
export default function CardStopPoint(): React.ReactElement {
  // Get the current theme resolved by next-themes
  const { resolvedTheme } = useTheme();

  // Determine if the screen width is considered mobile (less than 768px)
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Access state and setters from the journey, parking lot, and stop point stores
  const { selectedStop, selectedTripLeg, setSelectedTripLeg } =
    useJourneyStore();
  const { parentServicePointSloid, setParkingLot } = useParkingLotStore();
  const { stopPoint, setStopPoint } = useStopPointStore();
  const parentSloid = parentServicePointSloid;

  // Hook for programmatic navigation
  const router = useRouter();

  // Restore selectedTripLeg from localStorage if it exists
  useEffect(() => {
    const savedTripLeg = localStorage.getItem("selectedTripLeg");
    if (savedTripLeg) {
      setSelectedTripLeg(JSON.parse(savedTripLeg));
    }
  }, [setSelectedTripLeg]);

  // Determine the vehicle type based on the selected trip leg
  const vehicleType = selectedTripLeg ? getVehicleType(selectedTripLeg) : "N/A";
  const VehicleIcon = getVehicleIcon(vehicleType, resolvedTheme);

  // Fetch parking lot data
  const fetchParkingLot = useCallback(async () => {
    if (!parentSloid) return;
    try {
      const parkingLot = await fetchAndCacheParkingLotData(parentSloid);
      setParkingLot(parkingLot);
    } catch (error) {
      console.error("Error fetching parking lot:", error);
    }
  }, [parentSloid, setParkingLot]);

  // Fetch stop point data
  const fetchStopPoint = useCallback(async () => {
    if (!parentSloid) return;
    try {
      const stopPoint = await fetchAndCacheStopPointData(parentSloid);
      setStopPoint(stopPoint);
    } catch (error) {
      console.error("Error fetching stop point:", error);
    }
  }, [parentSloid, setStopPoint]);

  // Fetch parking lot and stop point data on component mount or when parentSloid changes
  useEffect(() => {
    fetchParkingLot().then((r) => r);
    fetchStopPoint().then((r) => r);
  }, [fetchParkingLot, fetchStopPoint]);

  // Determine the interoperability message based on stop point data
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

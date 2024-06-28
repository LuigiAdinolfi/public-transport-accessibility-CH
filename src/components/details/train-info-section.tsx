import React from "react";
import {
  DarkTrainProfile,
  LightTrainProfile,
} from "@/assets/icons/train-profile";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import * as OJP from "ojp-sdk";
import {
  getStopPlaceName,
  getTrainNumber,
  getVehicleType,
} from "@/utils/tripUtils";

interface TrainInfoSectionProps {
  leg: OJP.TripLeg;
  legDuration: number;
}

/**
 * TrainInfoSection component displays train information including vehicle type, train number,
 * destination stop place, and optionally, duration and navigation button.
 *
 * @param {TrainInfoSectionProps} props - Props for TrainInfoSection component.
 * @returns {React.ReactElement} TrainInfoSection component.
 */
export default function TrainInfoSection({
  leg,
  legDuration,
}: TrainInfoSectionProps): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  // Determine train information based on leg type
  const trainNumber = getTrainNumber(leg);
  const trainDestinationStopPlace = getStopPlaceName(leg);
  const vehicleType = getVehicleType(leg);

  return (
    <div className="flex items-center justify-between p-6 px-8 pb-6">
      {/* Train information display */}
      <div className="flex items-center space-x-1.5 md:h-10">
        <div className="pr-1 text-base font-medium">{vehicleType}</div>
        {/* Train profile icon based on theme */}
        <div className="text-base font-normal">
          {resolvedTheme === "dark" ? (
            <DarkTrainProfile className="h-6 w-6" />
          ) : (
            <LightTrainProfile className="h-6 w-6" />
          )}
        </div>
        <div className="pl-1 text-base font-medium">{trainNumber}</div>
        <div className="pl-2 text-base font-normal">
          Richtung {trainDestinationStopPlace}
        </div>
      </div>
      {/* Optional display of transfer duration and navigation button */}
      {legDuration !== 0 && (
        <>
          <div className="flex-grow text-center text-base font-semibold">
            {legDuration} Minuten zum Umsteigen
          </div>
          <Button
            className="ml-4 md:text-base"
            variant="outline"
            onClick={() => router.push("/select/details")}
          >
            Weg zum Umsteigen
            <Map className="ml-2 h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}

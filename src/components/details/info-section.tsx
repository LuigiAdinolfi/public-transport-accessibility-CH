import React from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import * as OJP from "ojp-sdk";
import {
  getStopPlaceName,
  getVehicleNumber,
  getVehicleType,
} from "@/utils/tripUtils";
import { getVehicleIcon } from "@/utils/iconsUtils";

interface InfoSectionProps {
  leg: OJP.TripLeg;
  legDuration: number;
}

/**
 * InfoSection component displays vehicle information including vehicle type, vehicle number,
 * destination stop place, and optionally, duration and navigation button.
 *
 * @param {InfoSectionProps} props - Props for InfoSection component.
 * @returns {React.ReactElement} InfoSection component.
 */
export default function InfoSection({
  leg,
  legDuration,
}: InfoSectionProps): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  // Determine train information based on leg type
  const vehicleNumber = getVehicleNumber(leg);
  const vehicleDestinationStopPlace = getStopPlaceName(leg);
  const vehicleType = getVehicleType(leg);

  const VehicleIcon = getVehicleIcon(vehicleType, resolvedTheme);

  return (
    <div className="flex items-center justify-between p-6 px-8 pb-6">
      {/* Vehicle information display */}
      <div className="flex items-center space-x-1.5 md:h-10">
        <div className="pr-1 text-base font-medium">{vehicleType}</div>
        {/* Vehicle profile icon based on theme */}
        <div className="text-base font-normal">
          {VehicleIcon && <VehicleIcon className="h-6 w-6" />}
        </div>
        <div className="pl-1 text-base font-medium">{vehicleNumber}</div>
        <div className="pl-2 text-base font-normal">
          Richtung {vehicleDestinationStopPlace}
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

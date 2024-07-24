import React from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Map, TriangleAlert } from "lucide-react";
import * as OJP from "ojp-sdk";
import { getVehicleIcon } from "@/utils/handleVehicleIcon";
import { useMediaQuery } from "react-responsive";
import { getVehicleNumber } from "@/utils/getVehicleNumber";
import { getStopPlaceName } from "@/utils/getStopPlaceName";
import { getVehicleType } from "@/utils/getVehicleType";

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
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const VehicleIcon = getVehicleIcon(vehicleType, resolvedTheme);

  return (
    <div
      className={`flex items-center justify-between ${!isMobile ? "px-8 py-6" : "flex-col gap-3 p-4 px-2 pb-6"} `}
    >
      {/* Vehicle information display */}
      {legDuration === 0 ? (
        <div className="flex items-center space-x-1.5 md:h-12">
          {!isMobile && (
            <div className="pr-1 text-base font-medium">{vehicleType}</div>
          )}
          {/* Vehicle profile icon based on theme */}
          <div className="text-base font-normal">
            {VehicleIcon && <VehicleIcon className="h-6 w-6" />}
          </div>
          <div className="pl-1 text-base font-medium">{vehicleNumber}</div>
          <div className="pl-2 text-base font-normal">
            Richtung {vehicleDestinationStopPlace}
          </div>
        </div>
      ) : (
        <div className="flex-col items-center space-y-2.5 md:h-12 md:w-56">
          <div className="flex items-center space-x-1.5">
            {!isMobile && (
              <div className="pr-1 text-base font-medium">{vehicleType}</div>
            )}
            {/* Vehicle profile icon based on theme */}
            <div className="text-base font-normal">
              {VehicleIcon && <VehicleIcon className="h-6 w-6" />}
            </div>
            <div className="pl-1 text-base font-medium">{vehicleNumber}</div>
          </div>
          <div className="text-base font-normal">
            Richtung {vehicleDestinationStopPlace}
          </div>
        </div>
      )}
      {/* Optional display of transfer duration and navigation button */}
      {legDuration !== 0 && (
        <>
          {legDuration > 15 ? (
            <div className="flex-grow text-center text-xl font-bold">
              {legDuration} Minuten zum Umsteigen
            </div>
          ) : (
            <div className="max-w-96 flex-col text-center text-xl font-bold">
              <div className="flex-grow text-center text-xl font-bold">
                {legDuration} Minuten zum Umsteigen
              </div>
              <div className="flex items-center py-4">
                <TriangleAlert
                  size={`${isMobile ? 24 : 32}`}
                  className="flex-shrink-0"
                />
                <div className="flex-grow text-center text-base font-medium leading-relaxed">
                  Achtung, die Umsteigezeit für Rollstuhlfahrer ist
                  möglicherweise nicht ausreichend
                </div>
              </div>
            </div>
          )}
          <Button
            className="ml-4 h-12 md:text-base"
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

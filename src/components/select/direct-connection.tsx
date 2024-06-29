"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CommunityRatingSelect } from "@/components/select/community-rating-select";
import { useMediaQuery } from "react-responsive";
import * as OJP from "ojp-sdk";
import {
  getArrivalTime,
  getDepartureTime,
  getVehicleNumber,
  getVehicleType,
} from "@/utils/tripUtils";
import { useJourneyStore } from "@/store/useJourneyStore";
import { WheelchairReservationIcon } from "@/components/select/wheelchair-reservation-icon";
import { getVehicleIcon } from "@/utils/iconsUtils";
import { useTheme } from "next-themes";
import { useHandleClick } from "@/utils/journeyUtils";

/**
 * Component representing a direct connection in a journey.
 * @param {Object} props - Component props.
 * @param {OJP.TripLeg[]} props.allLegs - Array of trip legs representing the direct connection.
 * @param {string} props.duration - Duration of the direct connection.
 * @returns {React.ReactElement} - The rendered direct connection component.
 */
export function DirectConnection({
  allLegs,
  duration,
}: {
  allLegs: OJP.TripLeg[];
  duration: string;
}): React.ReactElement {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { resolvedTheme } = useTheme();
  const details = allLegs[0];
  const handleClick = useHandleClick(allLegs);

  // Extracted details for readability and maintainability
  const vehicleNumber = getVehicleNumber(details);
  const departureTime = getDepartureTime(details);
  const arrivalTime = getArrivalTime(details);
  const fromLocationName = details.fromLocation.locationName;
  const toLocationName = details.toLocation.locationName;
  const vehicleType = getVehicleType(details);
  const VehicleIcon = getVehicleIcon(vehicleType, resolvedTheme);

  return (
    <Button
      className="flex h-full w-full justify-start border-zinc-400"
      variant="outline"
      onClick={handleClick}
    >
      <div className={`w-full ${!isMobile ? "grid" : ""}`}>
        {/* Accessibility and Travel Time */}
        <div
          className={`mb-1 flex w-full items-center justify-start ${isMobile ? "flex-col" : "px-3"} py-4 text-zinc-950 dark:text-zinc-50`}
        >
          <div className="flex w-full items-center justify-start">
            <div className="pr-2 md:text-base">
              Niedrigste Barrierefreiheit:
            </div>
            {/* Wheelchair Accessibility Icon */}
            <WheelchairReservationIcon />
            {!isMobile && (
              <div className="pl-2 md:text-base">
                Mit Personalhilfe ein-/aussteigen
              </div>
            )}
          </div>
          <div
            className={`${isMobile ? "flex w-full justify-start pt-1" : "justify-end md:text-base"}`}
          >
            {duration}
          </div>
        </div>
        {/* Connection Details */}
        <div className="mb-2 flex flex-row">
          <div className="flex w-full justify-start rounded-lg bg-zinc-50 dark:bg-zinc-900">
            <div className="w-full py-2">
              {/* Time and Station */}
              <div className="flex w-full items-center justify-between px-3 pb-3 pt-1 font-normal">
                <div className="flex justify-start">{departureTime}</div>
                <div className="flex justify-end">{arrivalTime}</div>
              </div>
              {/* Departure and Arrival Stations */}
              <div className="flex w-full items-center justify-between px-3">
                <div className="items-center text-base font-semibold md:text-lg">
                  {fromLocationName}
                </div>
                <div className="flex items-center justify-center font-medium">
                  {!isMobile && (
                    <div className="flex items-center pr-2">{vehicleType}</div>
                  )}
                  {/* Vehicle Profile Icon */}
                  <div>
                    {VehicleIcon && <VehicleIcon className="h-6 w-6" />}
                  </div>
                  {!isMobile && <div className="pl-2">{vehicleNumber}</div>}
                </div>
                <div className="items-center text-base font-semibold md:text-lg">
                  {toLocationName}
                </div>
              </div>
              {/* Accessibility Information */}
              <div
                className={`flex w-full justify-between px-3 ${isMobile ? "py-2" : "py-3"} font-medium`}
              >
                <div className="flex basis-1/2 items-center justify-start">
                  {/* Wheelchair Accessibility Icon */}
                  <WheelchairReservationIcon />
                  {!isMobile && (
                    <div className="flex flex-col pl-2">
                      <span>Mit Personalhilfe ein-/aussteigen</span>
                    </div>
                  )}
                </div>
                <div className="flex basis-1/2 items-center justify-end">
                  {!isMobile && (
                    <div className="flex flex-col pr-2 text-right">
                      <span>Mit Personalhilfe ein-/aussteigen</span>
                    </div>
                  )}
                  {/* Wheelchair Accessibility Icon */}
                  <WheelchairReservationIcon />
                </div>
              </div>
              {/* Community Rating */}
              <div
                className={`flex w-full ${isMobile ? "justify-center" : "items-center justify-start pt-4"} px-3 pb-2 font-normal`}
              >
                {!isMobile && (
                  <div className="pr-3">Bewertung der Community:</div>
                )}
                <CommunityRatingSelect value={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Button>
  );
}

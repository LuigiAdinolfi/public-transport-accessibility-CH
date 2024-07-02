"use client";

import * as React from "react";
import { CommunityRatingSelect } from "@/components/select/community-rating-select";
import { useMediaQuery } from "react-responsive";
import * as OJP from "ojp-sdk";
import {
  getArrivalTime,
  getDepartureTime,
  getVehicleNumber,
  getVehicleType,
  truncateTo12Chars,
} from "@/utils/handleLocation";
import { WheelchairReservationIcon } from "@/components/select/wheelchair-reservation-icon";
import { WheelchairIcon } from "@/components/select/wheelchair-icon";
import { getVehicleIcon } from "@/utils/handleVehicleIcon";
import { useTheme } from "next-themes";

/**
 * Component representing the last connection in a journey.
 * @param {Object} props - Component props.
 * @param {OJP.TripLeg[]} props.allLegs - Array of trip legs representing the journey details.
 * @returns {React.ReactElement} JSX Element representing the last connection component.
 */
export function LastConnection({
  allLegs,
  duration,
}: {
  allLegs: OJP.TripLeg[];
  duration: string;
}): React.ReactElement {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { resolvedTheme } = useTheme();
  // Extract details for the last leg of the journey
  const lastLeg = allLegs[allLegs.length - 1];
  const fromLocationName = lastLeg.fromLocation.locationName;
  const fromLocation = truncateTo12Chars(fromLocationName ?? "N/A");
  const toLocationName = lastLeg.toLocation.locationName;
  const toLocation = truncateTo12Chars(toLocationName ?? "N/A");
  const trainNumber = getVehicleNumber(lastLeg);
  const departureTime = getDepartureTime(lastLeg);
  const arrivalTime = getArrivalTime(lastLeg);
  const vehicleType = getVehicleType(lastLeg);
  const VehicleIcon = getVehicleIcon(vehicleType, resolvedTheme);

  return (
    <div className="flex basis-1/2 justify-start rounded-lg bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full py-2">
        {/* Time and Station */}
        <div className="flex w-full items-center justify-between px-3 pb-3 pt-1 font-normal">
          <div className="flex justify-start">{departureTime}</div>
          <div className="flex justify-end">{arrivalTime}</div>
        </div>
        {/* Departure and Arrival Stations */}
        <div
          className={`flex w-full items-center justify-between px-3 ${!isMobile ? "pb-3 pt-2" : ""}`}
        >
          <div className="items-center text-base font-semibold md:text-lg">
            {fromLocation}
          </div>
          <div className="flex items-center justify-center font-medium">
            {!isMobile && (
              <div className="flex items-center pr-2 font-medium">
                {vehicleType}
              </div>
            )}
            <div>{VehicleIcon && <VehicleIcon className="h-6 w-6" />}</div>
            {!isMobile && <div className="pl-2 font-medium">{trainNumber}</div>}
          </div>
          <div className="items-center overflow-hidden overflow-ellipsis text-base font-semibold md:text-lg">
            {toLocation}
          </div>
        </div>
        {/* Accessibility Information */}
        <div
          className={`flex w-full justify-between px-3 ${isMobile ? "py-2" : "py-3"} font-medium`}
        >
          <div className="mr-4 flex flex-1 items-center justify-start">
            <div className="min-w-[24px] flex-shrink-0">
              <WheelchairReservationIcon />
            </div>
            {!isMobile && (
              <div className="flex flex-col pl-2">
                <span className="whitespace-pre-wrap text-left">
                  Mit Personalhilfe ein-/aussteigen, vorher anmelden
                </span>
              </div>
            )}
          </div>
          <div className="ml-4 flex flex-1 items-center justify-end">
            {!isMobile && (
              <div className="flex flex-col pr-2 text-right">
                <span className="whitespace-pre-wrap text-right">
                  Selber ein-/aussteigen
                </span>
              </div>
            )}
            <div className="min-w-[24px] flex-shrink-0">
              <WheelchairIcon />
            </div>
          </div>
        </div>
        <div
          className={`flex w-full items-center justify-between px-3 ${isMobile ? "pt-1" : ""}`}
        >
          {/* Community Rating */}
          <div
            className={`flex w-full ${isMobile ? "" : "items-center pb-2 pt-4"} justify-start font-normal`}
          >
            {!isMobile && <div className="pr-3">Bewertung der Community:</div>}
            <CommunityRatingSelect value={4} />
          </div>
          <div
            className={`${isMobile ? "flex w-full justify-start" : "justify-end"}`}
          >
            {duration}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { CommunityRatingSelect } from "@/components/select/community-rating-select";
import { useMediaQuery } from "react-responsive";
import * as OJP from "ojp-sdk";
import {
  getArrivalTime,
  getDepartureTime,
  getTrainNumber,
  getVehicleType,
  truncateTo12Chars,
} from "@/utils/tripUtils";
import { WheelchairReservationIcon } from "@/components/select/wheelchair-reservation-icon";
import { TrainProfileIcon } from "@/components/select/train-profile-icon";

/**
 * Component representing the first connection in a journey.
 * @param {Object} props - Component props.
 * @param {OJP.TripLeg[]} props.allLegs - Array of trip legs representing the first connection.
 * @returns {React.ReactElement} - The rendered first connection component.
 */
export function FirstConnection({
  allLegs,
}: {
  allLegs: OJP.TripLeg[];
}): React.ReactElement {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const firstLeg = allLegs[0];
  const fromLocationName = firstLeg.fromLocation.locationName;
  const fromLocation = truncateTo12Chars(fromLocationName ?? "N/A");
  const toLocationName = firstLeg.toLocation.locationName;
  const toLocation = truncateTo12Chars(toLocationName ?? "N/A");
  const trainNumber = getTrainNumber(firstLeg);
  const departureTime = getDepartureTime(firstLeg);
  const arrivalTime = getArrivalTime(firstLeg);
  const vehicleType = getVehicleType(firstLeg);

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
          <div className="flex items-center justify-center font-normal">
            {!isMobile && (
              <div className="flex items-center pr-2 font-medium">
                {vehicleType}
              </div>
            )}
            <div>
              <TrainProfileIcon />
            </div>
            {!isMobile && <div className="pl-2 font-medium">{trainNumber}</div>}
          </div>
          <div className="items-center text-base font-semibold md:text-lg">
            {toLocation}
          </div>
        </div>
        {/* Accessibility Information */}
        <div
          className={`flex w-full justify-between px-3 ${isMobile ? "py-2" : "py-3"} font-medium`}
        >
          <div className="flex basis-1/2 items-center justify-start">
            <WheelchairReservationIcon />
            {!isMobile && (
              <div className="flex flex-col pl-2">
                <span>Mit Personalhilfe</span>
                <span>ein-/aussteigen</span>
              </div>
            )}
          </div>
          <div className="flex basis-1/2 items-center justify-end">
            {!isMobile && (
              <div className="flex flex-col pr-2 text-right">
                <span>Mit Personalhilfe</span>
                <span>ein-/aussteigen</span>
              </div>
            )}
            <WheelchairReservationIcon />
          </div>
        </div>
        {/* Community Rating */}
        <div
          className={`flex w-full ${isMobile ? "justify-center" : "items-center justify-start pt-4"} px-3 pb-2 font-normal`}
        >
          {!isMobile && <div className="pr-3">Bewertung der Community:</div>}
          <CommunityRatingSelect value={3} />
        </div>
      </div>
    </div>
  );
}

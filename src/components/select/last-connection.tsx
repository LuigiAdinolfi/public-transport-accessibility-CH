"use client";

import * as React from "react";
import { DarkTrainProfile, LightTrainProfile } from "@/assets/icons/train-profile";
import { useTheme } from "next-themes";
import { DarkWheelchairReservation, LightWheelchairReservation } from "@/assets/icons/wheelchair-reservation";
import { DarkWheelchair, LightWheelchair } from "@/assets/icons/wheelchair";
import { CommunityRatingSelect } from "@/components/select/community-rating-select";
import { useMediaQuery } from "react-responsive";
import * as OJP from "ojp-sdk";

interface LastConnectionProps {
  leg: OJP.TripLeg;
}



/**
 * Type guard to check if the trip leg is a TripTimedLeg
 * @param leg - The trip leg to check
 * @returns {boolean} Whether the leg is a TripTimedLeg
 */
function isTripTimedLeg(leg: OJP.TripLeg): leg is OJP.TripTimedLeg {
  return (leg as OJP.TripTimedLeg).fromStopPoint !== undefined;
}

/**
 * Function to format date to HH:MM
 * @param date - The date to format
 * @returns {string} Formatted time string
 */
function formatTime(date: Date | null): string {
  if (!date) return 'N/A';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Component representing the last connection in a journey.
 * @returns {JSX.Element} JSX Element
 */
export function LastConnection({ leg }: LastConnectionProps) {
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const trainNumber = isTripTimedLeg(leg)
    ? leg.service.serviceLineNumber ?? 'N/A'
    : 'N/A';

  // Format departure and arrival times for last leg
  const departureTime = isTripTimedLeg(leg)
    ? formatTime(leg.fromStopPoint.departureData?.timetableTime ?? null)
    : 'N/A';
  const arrivalTime = isTripTimedLeg(leg)
    ? formatTime(leg.toStopPoint.arrivalData?.timetableTime ?? null)
    : 'N/A';

  return (
    <div className="flex basis-1/2 justify-start rounded-lg bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full py-2">
        {/* Time and Station */}
        <div className="flex w-full items-center justify-between px-3 pt-1 pb-3 font-normal">
          <div className="flex justify-start">{departureTime}</div>
          <div className="flex justify-end">{arrivalTime}</div>
        </div>
        {/* Departure and Arrival Stations */}
        <div className={`flex w-full items-center justify-between px-3 ${!isMobile ? "pt-2 pb-3" : ""}`}>
          <div className="md:text-lg text-base items-center font-semibold">
            {leg.fromLocation.locationName}
          </div>
          <div className="flex justify-center items-center font-normal">
            {!isMobile &&  <div className="flex items-center font-medium pr-2">
              Zug
            </div>
            }
            <div>
              {resolvedTheme === "dark" ? (
                <DarkTrainProfile className="h-6 w-6" />
              ) : (
                <LightTrainProfile className="h-6 w-6" />
              )}
            </div>
            {!isMobile && (
              <div className="font-medium pl-2">
                {trainNumber}
              </div>
            )}
          </div>
          <div className="md:text-lg text-base items-center font-semibold">
          {leg.toLocation.locationName}
          </div>
        </div>
        {/* Accessibility Information */}
        <div className={`flex w-full justify-between px-3 ${isMobile ? "py-2" : "py-3"} font-medium`}>
          <div className="flex basis-1/2 justify-start items-center">
            {resolvedTheme === "dark" ? (
              <DarkWheelchairReservation className="h-6 w-6" />
            ) : (
              <LightWheelchairReservation className="h-6 w-6" />
            )}
            {!isMobile && (
              <div className="pl-2 flex flex-col">
                <span>Mit Personalhilfe</span>
                <span>ein-/aussteigen</span>
              </div>
            )}
          </div>
          <div className="flex basis-1/2 justify-end items-center">
            {!isMobile && (
              <div className="pr-2 flex flex-col text-right">
                <span>Selber ein-/</span>
                <span>aussteigen</span>
              </div>
            )}
            {resolvedTheme === "dark" ? (
              <DarkWheelchair className="h-6 w-6" />
            ) : (
              <LightWheelchair className="h-6 w-6" />
            )}
          </div>
        </div>
        {/* Community Rating */}
        <div className={`flex w-full ${isMobile ? "justify-center" : "items-center justify-start pt-4"} px-3 pb-2 font-normal`}>
          {!isMobile && <div className="pr-3">Bewertung der Community:</div>}
          <CommunityRatingSelect value={4} />
        </div>
      </div>
    </div>
  );
}

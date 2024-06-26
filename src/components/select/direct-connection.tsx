"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { DarkWheelchairReservation, LightWheelchairReservation } from "@/assets/icons/wheelchair-reservation";
import { useRouter } from "next/navigation";
import { DarkTrainProfile, LightTrainProfile } from "@/assets/icons/train-profile";
import { CommunityRatingSelect } from "@/components/select/community-rating-select";
import { useTheme } from "next-themes";
import { useMediaQuery } from 'react-responsive';
import * as OJP from "ojp-sdk";

interface DirectConnectionProps {
  details: OJP.TripLeg;
  duration: string;
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
 * Component representing a direct connection in a journey.
 * @returns {JSX.Element} JSX Element
 */
export function DirectConnection({ details, duration }: DirectConnectionProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const trainNumber = isTripTimedLeg(details)
    ? details.service.serviceLineNumber ?? 'N/A'
    : 'N/A';

  const departureTime = isTripTimedLeg(details)
    ? formatTime(details.fromStopPoint.departureData?.timetableTime ?? null)
    : 'N/A';
  const arrivalTime = isTripTimedLeg(details)
    ? formatTime(details.toStopPoint.arrivalData?.timetableTime ?? null)
    : 'N/A';
  const fromLocationName = details.fromLocation.locationName;
  const toLocationName = details.toLocation.locationName;

  return (
    <Button className="flex h-full w-full justify-start" variant="outline" onClick={() => router.push("/select/details")}>
      <div className={`w-full ${!isMobile ? "grid" : ""}`}>
        {/* Accessibility and Travel Time */}
        <div className={`mb-1 flex w-full items-center justify-start ${isMobile ? "flex-col" : "px-3"} py-4 text-zinc-950 dark:text-zinc-50`}>
          <div className="flex w-full justify-start items-center">
            <div className="pr-2 md:text-base">Niedrigste Barrierefreiheit:</div>
            {/* Wheelchair Accessibility Icon */}
            {resolvedTheme === "dark" ? (
              <DarkWheelchairReservation className="h-6 w-6" aria-hidden="true" />
            ) : (
              <LightWheelchairReservation className="h-6 w-6" aria-hidden="true" />
            )}
            {!isMobile && (
              <div className="pl-2 md:text-base">Mit Personalhilfe ein-/aussteigen</div>
            )}
          </div>
          <div className={`${isMobile ? "flex w-full justify-start pt-1" : "justify-end md:text-base"}`}>{duration}</div>
        </div>
        {/* Connection Details */}
        <div className="flex flex-row mb-2">
          <div className="flex w-full justify-start rounded-lg bg-zinc-50 dark:bg-zinc-900">
            <div className="w-full py-2">
              {/* Time and Station */}
              <div className="flex w-full items-center justify-between px-3 pt-1 pb-3 font-normal">
                <div className="flex justify-start">{departureTime}</div>
                <div className="flex justify-end">{arrivalTime}</div>
              </div>
              {/* Departure and Arrival Stations */}
              <div className="flex w-full items-center justify-between px-3">
                <div className="md:text-lg text-base items-center font-semibold">
                  {fromLocationName}
                </div>
                <div className="flex justify-center items-center font-normal">
                  {!isMobile && (
                    <div className="flex items-center font-medium pr-2">
                      Zug
                    </div>
                  )}
                  {/* Train Profile Icon */}
                  <div>
                    {resolvedTheme === "dark" ? (
                      <DarkTrainProfile className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <LightTrainProfile className="h-6 w-6" aria-hidden="true" />
                    )}
                  </div>
                  {!isMobile && (
                    <div className="font-medium pl-2">
                      {trainNumber}
                    </div>
                  )}
                </div>
                <div className="md:text-lg text-base items-center font-semibold">
                  {toLocationName}
                </div>
              </div>
              {/* Accessibility Information */}
              <div className={`flex w-full justify-between px-3 ${isMobile ? 'py-2' : 'py-3'} font-medium`}>
                <div className="flex basis-1/2 justify-start items-center">
                  {/* Wheelchair Accessibility Icon */}
                  {resolvedTheme === "dark" ? (
                    <DarkWheelchairReservation className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <LightWheelchairReservation className="h-6 w-6" aria-hidden="true" />
                  )}
                  {!isMobile && (
                    <div className="pl-2 flex flex-col">
                      <span>Mit Personalhilfe ein-/aussteigen</span>
                    </div>
                  )}
                </div>
                <div className="flex basis-1/2 justify-end items-center">
                  {!isMobile && (
                    <div className="pr-2 flex flex-col text-right">
                      <span>Mit Personalhilfe ein-/aussteigen</span>
                    </div>
                  )}
                  {/* Wheelchair Accessibility Icon */}
                  {resolvedTheme === "dark" ? (
                    <DarkWheelchairReservation className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <LightWheelchairReservation className="h-6 w-6" aria-hidden="true" />
                  )}
                </div>
              </div>
              {/* Community Rating */}
              <div
                className={`flex w-full ${isMobile ? 'justify-center' : 'items-center justify-start pt-4'} px-3 pb-2 font-normal`}>
                {!isMobile && <div className="pr-3">Bewertung der Community:</div>}
                <CommunityRatingSelect value={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Button>
  );
}

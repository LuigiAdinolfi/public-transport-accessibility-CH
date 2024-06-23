"use client";

import * as React from "react";
import { DarkTrainProfile, LightTrainProfile } from "@/assets/icons/train-profile";
import { DarkIc6, LightIc6 } from "@/assets/icons/ic-6";
import { useTheme } from "next-themes";
import { DarkWheelchairReservation, LightWheelchairReservation } from "@/assets/icons/wheelchair-reservation";
import { CommunityRatingSelect } from "@/components/select/community-rating-select";
import { useMediaQuery } from 'react-responsive';

/**
 * Component representing the first connection in a journey.
 * @returns {JSX.Element} JSX Element
 */
export function FirstConnection() {
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="flex basis-1/2 justify-start rounded-lg bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full py-2">
        {/* Time and Station */}
        <div className="flex w-full items-center justify-between px-3 pt-1 pb-3 font-normal">
          <div className="flex justify-start">20:28</div>
          <div className="flex justify-end">20:55</div>
        </div>
        {/* Departure and Arrival Stations */}
        <div className={`flex w-full items-center justify-between px-3 ${!isMobile ? "pt-2 pb-3" : ""}`}>
          <div className="md:text-lg text-base items-center font-semibold">
            Basel SBB
          </div>
          <div className="flex justify-center items-center font-normal">
            {!isMobile &&  <div className="flex items-center pr-2">
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
              <div>
                {resolvedTheme === "dark" ? (
                  <DarkIc6 className="h-6 w-6" />
                ) : (
                  <LightIc6 className="h-6 w-6" />
                )}
              </div>
            )}
          </div>
          <div className="md:text-lg text-base items-center font-semibold">
            Olten
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
                <span>Mit Personalhilfe</span>
                <span>ein-/aussteigen</span>
              </div>
            )}
            {resolvedTheme === "dark" ? (
              <DarkWheelchairReservation className="h-6 w-6" />
            ) : (
              <LightWheelchairReservation className="h-6 w-6" />
            )}
          </div>
        </div>
        {/* Community Rating */}
        <div className={`flex w-full ${isMobile ? "justify-center" : "items-center justify-start pt-4"} px-3 pb-2 font-normal`}>
          {!isMobile && <div className="pr-3">Bewertung der Community:</div>}
          <CommunityRatingSelect value={3} />
        </div>
      </div>
    </div>
  );
}

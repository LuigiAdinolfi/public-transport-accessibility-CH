"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { DarkWheelchairReservation, LightWheelchairReservation } from "@/assets/icons/wheelchair-reservation";
import { useRouter } from "next/navigation";
import { DarkTrainProfile, LightTrainProfile } from "@/assets/icons/train-profile";
import { CommunityRatingSelect } from "@/components/select/community-rating-select";
import { useTheme } from "next-themes";
import { DarkIc36, LightIc36 } from "@/assets/icons/ic-36";
import { useMediaQuery } from 'react-responsive';

/**
 * Component representing a direct connection in a journey.
 * @returns {JSX.Element} JSX Element
 */
export function DirectConnection() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
          <div className={`${isMobile ? "flex w-full justify-start pt-1" : "justify-end md:text-base"}`}>46 min Reisezeit</div>
        </div>
        {/* Connection Details */}
        <div className="flex flex-row mb-2">
          <div className="flex w-full justify-start rounded-lg bg-zinc-50 dark:bg-zinc-900">
            <div className="w-full py-2">
              {/* Time and Station */}
              <div className="flex w-full items-center justify-between px-3 pt-1 pb-3 font-normal">
                <div className="flex justify-start">21:11</div>
                <div className="flex justify-end">21:57</div>
              </div>
              {/* Departure and Arrival Stations */}
              <div className="flex w-full items-center justify-between px-3">
                <div className="md:text-lg text-base items-center font-semibold">
                  Basel SBB
                </div>
                <div className="flex justify-center items-center font-normal">
                  {!isMobile && (
                    <div className="flex items-center pr-2">
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
                    <div>
                      {resolvedTheme === "dark" ? (
                        <DarkIc36 className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <LightIc36 className="h-6 w-6" aria-hidden="true" />
                      )}
                    </div>
                  )}
                </div>
                <div className="md:text-lg text-base items-center font-semibold">
                  Brugg AG
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

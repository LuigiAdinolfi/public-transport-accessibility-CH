"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { DarkWheelchairReservation, LightWheelchairReservation } from "@/assets/icons/wheelchair-reservation";
import { useRouter } from "next/navigation";
import { DarkTrainProfile, LightTrainProfile } from "@/assets/icons/train-profile";
import { CommunityRatingSelect } from "@/components/select/community-rating-select";
import { useTheme } from "next-themes";
import { DarkIc36, LightIc36 } from "@/assets/icons/ic-36";

/**
 * Component representing a direct connection in a journey.
 * @returns {JSX.Element} JSX Element
 */
export function DirectConnection() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  return (
    <Button className="flex h-full w-full justify-start" variant="outline"
            onClick={() => router.push("/select/details")}>
      <div className="grid w-full">
        {/* Accessibility and Travel Time */}
        <div className="mb-2 flex w-full items-center justify-start px-3 py-4 text-zinc-950 dark:text-zinc-50">
          <div className="flex w-full justify-start">
            <div className="pr-2">Niedrigste Barrierefreiheit:</div>
            {/* Wheelchair Accessibility Icon */}
            {resolvedTheme === "dark" ? (
              <DarkWheelchairReservation className="h-6 w-6" aria-hidden="true" />
            ) : (
              <LightWheelchairReservation className="h-6 w-6" aria-hidden="true" />
            )}
            <div className="pl-2">Mit Personalhilfe ein-/aussteigen</div>
          </div>
          <div className="justify-end">46 min Reisezeit</div>
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
              <div className="flex w-full items-center justify-between px-3 pt-2 pb-3">
                <div className="text-base items-center font-semibold">
                  Basel SBB
                </div>
                <div className="flex justify-center items-center font-normal">
                  <div className="flex items-center pr-2">
                    Zug
                  </div>
                  {/* Train Profile Icon */}
                  <div>
                    {resolvedTheme === "dark" ? (
                      <DarkTrainProfile className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <LightTrainProfile className="h-6 w-6" aria-hidden="true" />
                    )}
                  </div>
                  {/* Additional Icon */}
                  <div>
                    {resolvedTheme === "dark" ? (
                      <DarkIc36 className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <LightIc36 className="h-6 w-6" aria-hidden="true" />
                    )}
                  </div>
                </div>
                <div className="text-base items-center font-semibold">
                  Brugg AG
                </div>
              </div>
              {/* Accessibility Information */}
              <div className="flex w-full justify-between px-3 py-3 font-medium">
                <div className="flex basis-1/2 justify-start items-center">
                  {/* Wheelchair Accessibility Icon */}
                  {resolvedTheme === "dark" ? (
                    <DarkWheelchairReservation className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <LightWheelchairReservation className="h-6 w-6" aria-hidden="true" />
                  )}
                  <div className="pl-2 flex flex-col">
                    <span>Mit Personalhilfe ein-/aussteigen</span>
                  </div>
                </div>
                <div className="flex basis-1/2 justify-end items-center">
                  <div className="pr-2 flex flex-col text-right">
                    <span>Mit Personalhilfe ein-/aussteigen</span>
                  </div>
                  {/* Wheelchair Accessibility Icon */}
                  {resolvedTheme === "dark" ? (
                    <DarkWheelchairReservation className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <LightWheelchairReservation className="h-6 w-6" aria-hidden="true" />
                  )}
                </div>
              </div>
              {/* Community Rating */}
              <div className="flex w-full items-center justify-start px-3 pb-2 pt-4 font-normal">
                <div className="pr-3">Bewertung der Community:</div>
                <CommunityRatingSelect value={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Button>
  );
}

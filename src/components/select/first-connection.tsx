"use client";

import * as React from "react";
import { DarkTrainProfile, LightTrainProfile } from "@/assets/icons/train-profile";
import { DarkIc6, LightIc6 } from "@/assets/icons/ic-6";
import { useTheme } from "next-themes";
import { DarkWheelchairReservation, LightWheelchairReservation } from "@/assets/icons/wheelchair-reservation";
import { CommunityRatingSelect } from "@/components/select/community-rating-select";

export function FirstConnection() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="flex basis-1/2 justify-start rounded-lg bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full py-2">
        <div className="flex w-full items-center justify-between px-3 pt-1 pb-3 font-normal">
          <div className="flex justify-start">20:28</div>
          <div className="flex justify-end">20:55</div>
        </div>
        <div className="flex w-full items-center justify-between px-3 pt-2 pb-3">
          <div className="text-base items-center font-semibold">
            Basel SBB
          </div>
          <div className="flex justify-center items-center font-normal">
            <div className="flex items-center pr-2">
              Zug
            </div>
            <div>
              {resolvedTheme === "dark" ? (
                <DarkTrainProfile className="h-6 w-6" />
              ) : (
                <LightTrainProfile className="h-6 w-6" />
              )}
            </div>
            <div>
              {resolvedTheme === "dark" ? (
                <DarkIc6 className="h-6 w-6" />
              ) : (
                <LightIc6 className="h-6 w-6" />
              )}
            </div>
          </div>
          <div className="text-base items-center font-semibold">
            Olten
          </div>
        </div>
        <div className="flex w-full justify-between px-3 py-3 font-medium">
          <div className="flex basis-1/2 justify-start items-center">
            {resolvedTheme === "dark" ? (
              <DarkWheelchairReservation className="h-6 w-6" />
            ) : (
              <LightWheelchairReservation className="h-6 w-6" />
            )}
            <div className="pl-2 flex flex-col">
              <span>Mit Personalhilfe</span>
              <span>ein-/aussteigen</span>
            </div>
          </div>
          <div className="flex basis-1/2 justify-end items-center">
            <div className="pr-2 flex flex-col text-right">
              <span>Mit Personalhilfe</span>
              <span>ein-/aussteigen</span>
            </div>
            {resolvedTheme === "dark" ? (
              <DarkWheelchairReservation className="h-6 w-6" />
            ) : (
              <LightWheelchairReservation className="h-6 w-6" />
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-start px-3 pb-2 pt-4 font-normal">
          <div className="pr-3">Bewertung der Community:</div>
          <CommunityRatingSelect value={3} />
        </div>
      </div>
    </div>
  );
}

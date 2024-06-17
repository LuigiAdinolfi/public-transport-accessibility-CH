"use client";

import { DarkTrainProfile, LightTrainProfile } from "@/assets/icons/train-profile";
import * as React from "react";
import { useTheme } from "next-themes";
import { DarkIr16, LightIr16 } from "@/assets/icons/ir-16";
import { LightWheelchairReservation } from "@/assets/icons/wheelchair-reservation";
import { LightWheelchair } from "@/assets/icons/wheelchair";
import { CommunityRating } from "@/components/select/community-rating";

export function LastConnection() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="flex basis-1/2 justify-start rounded-lg bg-zinc-50">
      <div className="w-full py-2">
        <div className="flex w-full items-center justify-between px-3 pt-1 pb-3 font-normal">
          <div className="flex justify-start">21:02</div>
          <div className="flex justify-end">21:28</div>
        </div>
        <div className="flex w-full items-center justify-between px-3 pt-2 pb-3">
          <div className="text-base items-center font-semibold">
            Olten
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
                <DarkIr16 className="h-6 w-6" />
              ) : (
                <LightIr16 className="h-6 w-6" />
              )}
            </div>
          </div>
          <div className="text-base items-center font-semibold">
            Brugg AG
          </div>
        </div>
        <div className="flex w-full justify-between px-3 py-3 font-medium">
          <div className="flex basis-1/2 justify-start items-center">
            <LightWheelchairReservation className="h-6 w-6" />
            <div className="pl-2 flex flex-col">
              <span>Mit Personalhilfe</span>
              <span>ein-/aussteigen</span>
            </div>
          </div>
          <div className="flex basis-1/2 justify-end items-center">
            <div className="pr-2 flex flex-col text-right">
              <span>Selber ein-/</span>
              <span>aussteigen</span>
            </div>
            <LightWheelchair className="h-6 w-6" />
          </div>
        </div>
        <div className="flex w-full items-center justify-start px-3 pb-2 pt-4 font-normal">
          <div className="pr-3">Bewertung der Community:</div>
          <CommunityRating value={4} />
        </div>
      </div>
    </div>
  );
}
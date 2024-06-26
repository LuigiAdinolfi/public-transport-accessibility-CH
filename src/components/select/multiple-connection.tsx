"use client";

import * as React from "react";
import { FirstConnection } from "@/components/select/first-connection";
import { LastConnection } from "@/components/select/last-connection";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DarkWheelchairReservation, LightWheelchairReservation } from "@/assets/icons/wheelchair-reservation";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useMediaQuery } from "react-responsive";
import * as OJP from "ojp-sdk";
import { useJourneyStore } from "@/store/useJourneyStore";


/**
 * Component representing a journey with multiple connections.
 * @returns {JSX.Element} JSX Element
 */
export function MultipleConnection({ firstLeg, lastLeg, allLegs, duration }: { firstLeg: OJP.TripLeg, lastLeg: OJP.TripLeg, allLegs:  OJP.TripLeg[], duration: string }) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { setAllLegs } = useJourneyStore();

  const handleClick = () => {
    setAllLegs(allLegs);
    router.push("/select/details");
  };

  return (
    <Button
      className="flex h-full w-full justify-start"
      variant="outline"
      onClick={handleClick}
      aria-label="Select journey with multiple connections"
    >
      <div className={`w-full ${!isMobile ? "grid" : ""}`}>
        {/* Accessibility and Travel Time */}
        <div
          className={`mb-1 flex w-full items-center justify-start ${isMobile ? "flex-col" : "px-3"} py-4 text-zinc-950 dark:text-zinc-50`}>
          <div className="flex w-full justify-start items-center">
            <div className="pr-2 md:text-base">Niedrigste Barrierefreiheit:</div>
            <div>
              {resolvedTheme === "dark" ? (
                <DarkWheelchairReservation className="h-6 w-6" />
              ) : (
                <LightWheelchairReservation className="h-6 w-6" />
              )}
            </div>
            {!isMobile && <div className="pl-2 md:text-base">Mit Personalhilfe ein-/aussteigen</div>}
          </div>
          <div className={`${isMobile ? "flex w-full justify-start pt-1" : "justify-end"} md:text-base`}>{duration}</div>
        </div>

        {/* Connection Details */}
        <div className="flex flex-col sm:flex-row mb-2">
          <div className={`w-full ${isMobile ? "mb-1" : ""}`}>
            <FirstConnection leg={firstLeg} />
          </div>
          <div className="flex items-center justify-center px-2">
            {isMobile ? <ChevronDown /> : <ChevronRight />}
          </div>
          <div className={`w-full ${isMobile ? "mt-1" : ""}`}>
            <LastConnection leg={lastLeg} />
          </div>
        </div>
      </div>
    </Button>
  );
}

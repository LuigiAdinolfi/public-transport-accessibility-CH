"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { WheelchairReservationIcon } from "@/components/select/wheelchair-reservation-icon";
import { ConnectionDetails } from "@/components/select/connection-details";
import { useHandleClick } from "@/utils/handleConnection";
import * as OJP from "ojp-sdk";
import { useMediaQuery } from "react-responsive";

/**
 * Component representing a journey with multiple connections.
 * @param {Object} props - Component props.
 * @param {OJP.TripLeg[]} props.allLegs - Array of trip legs representing the journey details.
 * @param {string} props.duration - Total duration of the journey.
 * @returns {React.ReactElement} JSX Element representing the journey with multiple connections.
 */
export function MultipleConnection({
  allLegs,
  duration,
}: {
  allLegs: OJP.TripLeg[];
  duration: string;
}): React.ReactElement {
  const handleClick = useHandleClick(allLegs, duration);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Button
      className="flex h-full w-full justify-start border-zinc-400"
      variant="outline"
      onClick={handleClick}
      aria-label="Select journey with multiple connections"
    >
      <div className={`w-full ${!isMobile ? "grid" : ""}`}>
        {/* Accessibility and Travel Time */}
        <div
          className={`mb-1 flex w-full items-center justify-start ${isMobile ? "flex-col" : "px-3"} py-4 text-zinc-950 dark:text-zinc-50`}
        >
          <div className="flex w-full items-center justify-start">
            <div className="pr-2 md:text-base">
              Niedrigste Barrierefreiheit:
            </div>
            <div aria-label="Wheelchair reservation">
              <WheelchairReservationIcon />
            </div>
            {!isMobile && (
              <div className="pl-2 md:text-base">
                Mit Personalhilfe ein-/aussteigen
              </div>
            )}
          </div>
          <div
            className={`${isMobile ? "flex w-full justify-start pt-1" : "justify-end"} md:text-base`}
          >
            {duration}
          </div>
        </div>

        {/* Connection Details */}
        <ConnectionDetails allLegs={allLegs} />
      </div>
    </Button>
  );
}

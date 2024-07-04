"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useHandleClick } from "@/utils/handleConnection";
import * as OJP from "ojp-sdk";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "next-themes";
import { FirstConnection } from "@/components/select/first-connection";
import { ChevronDown, ChevronRight } from "lucide-react";
import { LastConnection } from "@/components/select/last-connection";
import {
  useFromStopPointVehicleAccessType,
  useToStopPointVehicleAccessType,
} from "@/hooks/useVehicleAccessType";
import {
  getAccessIcon,
  getWorstIconMultipleConnections,
} from "@/utils/handleAccessibilityIcon";

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
  const { resolvedTheme } = useTheme();
  const firstLeg = allLegs[0];
  const lastLeg = allLegs[allLegs.length - 1];

  const fromLocationVehicleAccessFirstLeg =
    useFromStopPointVehicleAccessType(firstLeg);
  const toLocationVehicleAccessFirstLeg =
    useToStopPointVehicleAccessType(firstLeg);

  const fromLocationVehicleAccessLastLeg =
    useFromStopPointVehicleAccessType(lastLeg);
  const toLocationVehicleAccessLastLeg =
    useToStopPointVehicleAccessType(lastLeg);

  const accessIconFromLocationFirstLeg = getAccessIcon(
    fromLocationVehicleAccessFirstLeg,
    resolvedTheme,
  );

  const accessIconToLocationFirstLeg = getAccessIcon(
    toLocationVehicleAccessFirstLeg,
    resolvedTheme,
  );

  const accessIconFromLocationLastLeg = getAccessIcon(
    fromLocationVehicleAccessLastLeg,
    resolvedTheme,
  );

  const accessIconToLocationLastLeg = getAccessIcon(
    toLocationVehicleAccessLastLeg,
    resolvedTheme,
  );

  const worstIconProps = getWorstIconMultipleConnections(
    accessIconFromLocationFirstLeg,
    accessIconToLocationFirstLeg,
    accessIconFromLocationLastLeg,
    accessIconToLocationLastLeg,
  );

  const WorstIcon = worstIconProps?.icon;
  const worstText = worstIconProps?.text;

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
            {WorstIcon && <WorstIcon className="h-6 w-6" />}
            {!isMobile && <div className="pl-2 md:text-base">{worstText}</div>}
          </div>
          <div
            className={`${isMobile ? "flex w-full justify-start pt-1" : "justify-end"} md:text-base`}
          >
            {duration}
          </div>
        </div>

        {/* Connection Details */}
        <div className="mb-2 flex flex-col sm:flex-row">
          <div className={`w-full ${isMobile ? "mb-1" : ""}`}>
            <FirstConnection allLegs={allLegs} />
          </div>
          <div className="flex items-center justify-center px-2">
            {isMobile ? <ChevronDown /> : <ChevronRight />}
          </div>
          <div className={`w-full ${isMobile ? "mt-1" : ""}`}>
            <LastConnection allLegs={allLegs} />
          </div>
        </div>
      </div>
    </Button>
  );
}

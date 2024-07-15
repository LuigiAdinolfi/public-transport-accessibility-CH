import * as React from "react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import * as OJP from "ojp-sdk";
import { useTheme } from "next-themes";
import { useHandleClick } from "@/hooks/useHandleClick";
import { getAccessIcon, getWorstIcon } from "@/utils/handleAccessibilityIcon";
import {
  useFromStopPointVehicleAccessType,
  useToStopPointVehicleAccessType,
} from "@/hooks/useVehicleAccessType";
import { SingleConnection } from "@/components/select/single-Connection";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Component representing a direct connection in a journey.
 * @param {Object} props - Component props.
 * @param {OJP.TripLeg[]} props.allLegs - Array of trip legs representing the direct connection.
 * @param {string} props.duration - Duration of the direct connection.
 * @returns {React.ReactElement} - The rendered direct connection component.
 */
export function DirectConnection({
  allLegs,
  duration,
}: {
  allLegs: OJP.TripLeg[];
  duration: string;
}): React.ReactElement {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { resolvedTheme } = useTheme();
  const details = allLegs[0];
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fromLocationVehicleAccessTypes = allLegs.map(
    useFromStopPointVehicleAccessType,
  );
  const toLocationVehicleAccessTypes = allLegs.map(
    useToStopPointVehicleAccessType,
  );

  const accessIcons = fromLocationVehicleAccessTypes.map((type, index) => ({
    origin: getAccessIcon(type, resolvedTheme),
    destination: getAccessIcon(
      toLocationVehicleAccessTypes[index],
      resolvedTheme,
    ),
  }));

  const handleClick = useHandleClick(
    allLegs,
    duration,
    accessIcons,
    router.push,
  );

  const handleButtonClick = async () => {
    setLoading(true);
    handleClick();
    setLoading(false);
  };

  const worstIconProps = getWorstIcon(
    accessIcons[0].origin,
    accessIcons[0].destination,
  );
  const WorstIcon = worstIconProps?.icon;
  const worstText = worstIconProps?.text;

  const accessibilityLabel = `Reise mit niedrigste Barrierefreiheit: ${worstText}`;

  return (
    <Button
      className="flex h-full w-full justify-start border-zinc-400"
      variant={loading ? "ghost" : "outline"}
      disabled={loading}
      onClick={handleButtonClick}
      aria-label={accessibilityLabel}
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
            {/* Wheelchair Accessibility Icon */}
            {WorstIcon && <WorstIcon className="h-6 w-6" />}
            {!isMobile && <div className="pl-2 md:text-base">{worstText}</div>}
          </div>
          <div
            className={`${isMobile ? "flex w-full justify-start pt-1" : "justify-end md:text-base"}`}
          >
            {duration}
          </div>
        </div>
        <SingleConnection
          details={details}
          accessIconOrigin={accessIcons[0].origin}
          accessIconDestination={accessIcons[0].destination}
        />
      </div>
    </Button>
  );
}

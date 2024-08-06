import * as React from "react";
import { Button } from "@/components/ui/button";
import { useHandleClick } from "@/hooks/useHandleClick";
import * as OJP from "ojp-sdk";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "next-themes";
import { FirstConnection } from "@/components/select/first-connection";
import { ChevronDown, ChevronRight, TriangleAlert } from "lucide-react";
import { LastConnection } from "@/components/select/last-connection";
import {
  useFromStopPointVehicleAccessType,
  useToStopPointVehicleAccessType,
} from "@/hooks/useVehicleAccessType";
import {
  getAccessIcon,
  getWorstIconMultipleConnections,
} from "@/utils/handleAccessibilityIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Component representing a journey with multiple connections.
 *
 * This component displays details of a journey with multiple connections, including accessibility
 * information, travel time, and connection details for the first and last legs. It also handles
 * user interactions and displays appropriate icons based on accessibility and warning conditions.
 *
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
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Determine if the device is mobile
  const { resolvedTheme } = useTheme(); // Get the current theme
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter(); // Router for navigation

  // Filter trip legs into timed and transfer legs
  const timedLegs = allLegs.filter((leg) => leg.legType === "TimedLeg");
  const transferLegs =
    allLegs.filter((leg) => leg.legType === "TransferLeg") || [];

  // Get accessibility types for from and to locations
  const fromLocationVehicleAccessTypes = timedLegs.map(
    useFromStopPointVehicleAccessType,
  );
  const toLocationVehicleAccessTypes = timedLegs.map(
    useToStopPointVehicleAccessType,
  );

  // Get accessibility icons for each leg
  const accessIcons = fromLocationVehicleAccessTypes.map((type, index) => ({
    origin: getAccessIcon(type, resolvedTheme),
    destination: getAccessIcon(
      toLocationVehicleAccessTypes[index],
      resolvedTheme,
    ),
  }));

  // Handle button click to initiate a specific action
  const handleClick = useHandleClick(
    allLegs,
    duration,
    accessIcons,
    router.push,
  );

  // Function to handle button click with loading state
  const handleButtonClick = async () => {
    setLoading(true);
    handleClick();
    setLoading(false);
  };

  // Get the worst accessibility icon and text for the journey
  const worstIconProps = getWorstIconMultipleConnections(
    accessIcons[0].origin,
    accessIcons[0].destination,
    accessIcons[accessIcons.length - 1].origin,
    accessIcons[accessIcons.length - 1].destination,
  );

  const WorstIcon = worstIconProps?.icon;
  const worstText = worstIconProps?.text;

  // Check if any transfer leg duration is less than 15 minutes and show warning if true
  const showWarningMessage = transferLegs.some(
    (leg) => leg.legDuration && leg.legDuration.totalMinutes < 15,
  );

  return (
    <Button
      className="flex h-full w-full justify-start border border-zinc-800 dark:border-zinc-500"
      variant={loading ? "ghost" : "outline"}
      disabled={loading}
      onClick={handleButtonClick}
    >
      <div className={`w-full ${!isMobile ? "grid" : ""}`}>
        {/* Accessibility and Travel Time */}
        <div
          className={`mb-1 flex w-full items-center justify-start ${isMobile ? "flex-col" : "px-3"} py-4 text-zinc-950 dark:text-zinc-50`}
        >
          <div className="flex w-full items-center justify-start font-semibold md:text-xl">
            <div className="pr-2">Barrierefreiheit:</div>
            {WorstIcon && <WorstIcon className="h-6 w-6" />}
            {!isMobile && <div className="pl-2">{worstText}</div>}
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
            <FirstConnection
              allLegs={timedLegs}
              accessIconOrigin={accessIcons[0].origin}
              accessIconDestination={accessIcons[0].destination}
            />
          </div>
          <div
            className={`flex justify-center px-2 ${isMobile ? "" : "pt-14"}`}
          >
            {showWarningMessage ? (
              <TriangleAlert size={24} className="flex-shrink-0" />
            ) : isMobile ? (
              <ChevronDown />
            ) : (
              <ChevronRight />
            )}
          </div>
          <div className={`w-full ${isMobile ? "mt-1" : ""}`}>
            <LastConnection
              allLegs={timedLegs}
              accessIconOrigin={accessIcons[accessIcons.length - 1].origin}
              accessIconDestination={
                accessIcons[accessIcons.length - 1].destination
              }
            />
          </div>
        </div>
      </div>
    </Button>
  );
}

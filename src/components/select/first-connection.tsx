import * as React from "react";
import { CommunityRatingSelect } from "@/components/select/community-rating-select";
import { useMediaQuery } from "react-responsive";
import * as OJP from "ojp-sdk";
import { getVehicleIcon } from "@/utils/handleVehicleIcon";
import { useTheme } from "next-themes";
import { truncateTo12Chars } from "@/utils/truncateTo12Chars";
import { getVehicleNumber } from "@/utils/getVehicleNumber";
import { getDepartureTime } from "@/utils/getDepartureTime";
import { getArrivalTime } from "@/utils/getArrivalTime";
import { getVehicleType } from "@/utils/getVehicleType";
import { accessProps } from "@/helpers/accessIconProps";

/**
 * Component representing the first connection in a journey.
 *
 * This component displays information about the first connection leg of a journey, including
 * departure and arrival times, locations, vehicle type and number, accessibility information,
 * and community rating. It adapts its layout for mobile and desktop views.
 *
 * @param {Object} props - Component props.
 * @param {OJP.TripLeg[]} props.allLegs - Array of trip legs representing the first connection.
 * @param {accessProps | null} props.accessIconOrigin - Accessibility icon and text for the origin stop point.
 * @param {accessProps | null} props.accessIconDestination - Accessibility icon and text for the destination stop point.
 * @returns {React.ReactElement} - The rendered first connection component.
 */
export function FirstConnection({
                                  allLegs,
                                  accessIconOrigin,
                                  accessIconDestination,
                                }: {
  allLegs: OJP.TripLeg[];
  accessIconOrigin: accessProps | null;
  accessIconDestination: accessProps | null;
}): React.ReactElement {
  // Check if the screen size is mobile
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Get the current theme (light or dark) from the theme hook
  const { resolvedTheme } = useTheme();

  // Extract the first trip leg details
  const firstLeg = allLegs[0];

  // Get and truncate location names
  const fromLocationName = firstLeg.fromLocation.locationName;
  const fromLocation = truncateTo12Chars(fromLocationName ?? "N/A");
  const toLocationName = firstLeg.toLocation.locationName;
  const toLocation = truncateTo12Chars(toLocationName ?? "N/A");

  // Get vehicle number, departure and arrival times, and vehicle type
  const vehicleNumber = getVehicleNumber(firstLeg);
  const departureTime = getDepartureTime(firstLeg);
  const arrivalTime = getArrivalTime(firstLeg);
  const vehicleType = getVehicleType(firstLeg);

  // Get the appropriate vehicle icon for the current theme
  const VehicleIcon = getVehicleIcon(vehicleType, resolvedTheme);

  // Get accessibility icons and text
  const AccessIconFromLocation = accessIconOrigin?.icon;
  const accessTextFromLocation = accessIconOrigin?.text;
  const AccessIconToLocation = accessIconDestination?.icon;
  const accessTextToLocation = accessIconDestination?.text;

  return (
    <div className="flex basis-1/2 justify-start rounded-lg bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full py-2">
        {/* Time and Station */}
        <div className="flex w-full items-center justify-between px-3 pb-2 pt-1 font-medium">
          <div className="flex justify-start text-base">{departureTime}</div>
          <div className="flex justify-end text-base">{arrivalTime}</div>
        </div>
        {/* Departure and Arrival Stations */}
        <div
          className={`flex w-full items-center justify-between px-3 ${!isMobile ? "pt-2" : ""}`}
        >
          <div className="items-center text-lg font-semibold md:text-lg">
            {fromLocation}
          </div>
          <div className="flex items-center justify-center text-base font-medium">
            {!isMobile && (
              <div className="flex items-center pr-2 font-medium">
                {vehicleType}
              </div>
            )}
            <div>{VehicleIcon && <VehicleIcon className="h-6 w-6" />}</div>
            {!isMobile && (
              <div className="pl-2 font-medium">{vehicleNumber}</div>
            )}
          </div>
          <div className="items-center text-lg font-semibold md:text-lg">
            {toLocation}
          </div>
        </div>
        {/* Accessibility Information */}
        <div
          className={`flex w-full justify-between px-3 ${isMobile ? "py-2" : "min-h-24"} font-medium`}
        >
          <div className="flex flex-1 items-center justify-start">
            <div className="min-w-[24px] flex-shrink-0">
              {AccessIconFromLocation && (
                <AccessIconFromLocation className="h-6 w-6" />
              )}
            </div>
            {!isMobile && (
              <div className="flex flex-col pl-2">
                <span className="whitespace-pre-wrap text-left">
                  {accessTextFromLocation}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-1 items-center justify-end">
            {!isMobile && (
              <div className="flex flex-col pr-2 text-right">
                <span className="whitespace-pre-wrap text-right">
                  {accessTextToLocation}
                </span>
              </div>
            )}
            <div className="min-w-[24px] flex-shrink-0">
              {AccessIconToLocation && (
                <AccessIconToLocation className="h-6 w-6" />
              )}
            </div>
          </div>
        </div>
        {/* Community Rating */}
        <div
          className={`flex w-full ${isMobile ? "justify-center" : "items-center justify-start"} px-3 pb-2 font-normal`}
        >
          {!isMobile && <div className="pr-3">Bewertung der Community:</div>}
          <CommunityRatingSelect value={3} />
        </div>
      </div>
    </div>
  );
}

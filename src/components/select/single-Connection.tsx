import * as OJP from "ojp-sdk";
import { accessProps } from "@/helpers/accessIconProps";
import * as React from "react";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "next-themes";
import { getVehicleNumber } from "@/utils/getVehicleNumber";
import { getArrivalTime } from "@/utils/getArrivalTime";
import { getDepartureTime } from "@/utils/getDepartureTime";
import { getVehicleType } from "@/utils/getVehicleType";
import { getVehicleIcon } from "@/utils/handleVehicleIcon";
import { CommunityRatingSelect } from "@/components/select/community-rating-select";

export function SingleConnection({
  details,
  accessIconOrigin,
  accessIconDestination,
}: {
  details: OJP.TripLeg;
  accessIconOrigin: accessProps | null;
  accessIconDestination: accessProps | null;
}): React.ReactElement {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { resolvedTheme } = useTheme();

  // Extracted details for readability and maintainability
  const fromLocationName = details.fromLocation.locationName;
  const toLocationName = details.toLocation.locationName;
  const vehicleNumber = getVehicleNumber(details);
  const arrivalTime = getArrivalTime(details);
  const departureTime = getDepartureTime(details);
  const vehicleType = getVehicleType(details);
  const VehicleIcon = getVehicleIcon(vehicleType, resolvedTheme);

  const AccessIconFromLocation = accessIconOrigin?.icon;
  const accessTextFromLocation = accessIconOrigin?.text;

  const AccessIconToLocation = accessIconDestination?.icon;
  const accessTextToLocation = accessIconDestination?.text;

  return (
    <div className="mb-2 flex flex-row">
      <div className="flex w-full justify-start rounded-lg bg-zinc-50 dark:bg-zinc-900">
        <div className="w-full py-2">
          {/* Time and Station */}
          <div className="flex w-full items-center justify-between px-3 pb-3 pt-1 font-normal">
            <div className="flex justify-start">{departureTime}</div>
            <div className="flex justify-end">{arrivalTime}</div>
          </div>
          {/* Departure and Arrival Stations */}
          <div className="flex w-full items-center justify-between px-3">
            <div
              id="fromLocation"
              className="items-center text-base font-semibold md:text-lg"
            >
              {fromLocationName}
            </div>
            <div className="flex items-center justify-center font-medium">
              {!isMobile && (
                <div id="vehicleType" className="flex items-center pr-2">
                  {vehicleType}
                </div>
              )}
              {/* Vehicle Profile Icon */}
              <div>{VehicleIcon && <VehicleIcon className="h-6 w-6" />}</div>
              {!isMobile && (
                <div className="pl-2" id="vehicleNumber">
                  {vehicleNumber}
                </div>
              )}
            </div>
            <div
              id="toLocation"
              className="items-center text-base font-semibold md:text-lg"
            >
              {toLocationName}
            </div>
          </div>
          {/* Accessibility Information */}
          <div
            className={`flex w-full justify-between px-3 ${isMobile ? "py-2" : "py-3"} font-medium`}
          >
            <div className="flex basis-1/2 items-center justify-start pt-2">
              {/* Wheelchair Accessibility Icon */}
              {AccessIconFromLocation && (
                <AccessIconFromLocation className="h-6 w-6" />
              )}
              {!isMobile && (
                <div id="accessibility-label" className="flex flex-col pl-2">
                  <span id="accessibilityFromLocation">
                    {accessTextFromLocation}
                  </span>
                </div>
              )}
            </div>
            <div className="flex basis-1/2 items-center justify-end pt-2">
              {!isMobile && (
                <div
                  id="accessibility-label"
                  className="flex flex-col pr-2 text-right"
                >
                  <span id="accessibilityToLocation">
                    {accessTextToLocation}
                  </span>
                </div>
              )}
              {/* Wheelchair Accessibility Icon */}
              {AccessIconToLocation && (
                <AccessIconToLocation className="h-6 w-6" />
              )}
            </div>
          </div>
          {/* Community Rating */}
          <div
            className={`flex w-full ${isMobile ? "justify-center" : "items-center justify-start pt-4"} px-3 pb-2 font-normal`}
          >
            {!isMobile && (
              <div className="pr-3" id="bewertung">
                Bewertung der Community:
              </div>
            )}
            <CommunityRatingSelect value={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

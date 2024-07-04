import React, { useEffect } from "react";
import * as OJP from "ojp-sdk";
import { Card } from "@/components/ui/card";
import InfoSection from "@/components/details/info-section";
import LocationSection from "@/components/details/location-section";
import CommunityRatingSection from "@/components/details/community-rating-section";
import { useJourneyStore } from "@/store/useJourneyStore";
import { useMediaQuery } from "react-responsive";
import {
  getPlatformNumberFromStopPoint,
  getPlatformNumberToStopPoint,
} from "@/utils/handleLocation";
import {
  useFromStopPointVehicleAccessType,
  useToStopPointVehicleAccessType,
} from "@/hooks/useVehicleAccessType";
import { getAccessIcon } from "@/utils/handleAccessibilityIcon";
import { useTheme } from "next-themes";

interface CardPathProps {
  index: number;
  legs: OJP.TripLeg[];
  legDuration: number;
}

/**
 * CardPath component displays details of a specific leg of a journey.
 *
 * @param {CardPathProps} props - The properties passed to the component.
 * @returns {React.ReactElement} The CardPath component.
 */
export default function CardPath({
  index,
  legs,
  legDuration,
}: CardPathProps): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const selectedLeg = legs[index];
  const fromLocationName = selectedLeg.fromLocation.locationName ?? "N/A";
  const toLocationName = selectedLeg.toLocation.locationName ?? "N/A";
  const platformFromLocation = getPlatformNumberFromStopPoint(selectedLeg);
  const platformToLocation = getPlatformNumberToStopPoint(selectedLeg);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { setSelectedTripLeg } = useJourneyStore();

  const fromLocationVehicleAccessType =
    useFromStopPointVehicleAccessType(selectedLeg);
  const toLocationVehicleAccessType =
    useToStopPointVehicleAccessType(selectedLeg);

  const accessIconFromLocationProps = getAccessIcon(
    fromLocationVehicleAccessType,
    resolvedTheme,
  );

  const accessIconToLocationProps = getAccessIcon(
    toLocationVehicleAccessType,
    resolvedTheme,
  );

  useEffect(() => {
    setSelectedTripLeg(selectedLeg);
  }, [index, setSelectedTripLeg, selectedLeg]);

  return (
    <Card>
      <InfoSection leg={selectedLeg} legDuration={legDuration} />
      <div className={`flex gap-6 px-6 ${!isMobile ? "" : "flex-col"}`}>
        <LocationSection
          locationName={fromLocationName}
          platform={platformFromLocation}
          accessIconLocationProps={accessIconFromLocationProps}
          aria-label={`Departure from ${fromLocationName} at ${platformFromLocation}`}
        />
        <LocationSection
          locationName={toLocationName}
          platform={platformToLocation}
          accessIconLocationProps={accessIconToLocationProps}
          aria-label={`Arrival at ${toLocationName} at ${platformToLocation}`}
        />
      </div>
      <CommunityRatingSection value={3} aria-label="Community rating section" />
    </Card>
  );
}

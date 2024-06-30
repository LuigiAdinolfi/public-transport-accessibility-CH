import React from "react";
import * as OJP from "ojp-sdk";
import { Card } from "@/components/ui/card";
import InfoSection from "@/components/details/info-section";
import LocationSection from "@/components/details/location-section";
import CommunityRatingSection from "@/components/details/community-rating-section";
import { useJourneyStore } from "@/store/useJourneyStore";
import { useMediaQuery } from "react-responsive";

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
  const selectedLeg = legs[index];
  const fromLocationName = selectedLeg.fromLocation.locationName ?? "N/A";
  const toLocationName = selectedLeg.toLocation.locationName ?? "N/A";
  const platform = "Gleis 9"; // Example, customize as needed
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { setSelectedTripLeg } = useJourneyStore();

  React.useEffect(() => {
    setSelectedTripLeg(selectedLeg);
  }, [index, setSelectedTripLeg, selectedLeg]);

  return (
    <Card>
      <InfoSection leg={selectedLeg} legDuration={legDuration} />
      <div className={`flex gap-6 px-6 ${!isMobile ? "" : "flex-col"}`}>
        <LocationSection
          locationName={fromLocationName}
          platform={platform}
          aria-label={`Departure from ${fromLocationName} at ${platform}`}
        />
        <LocationSection
          locationName={toLocationName}
          platform="Gleis 12"
          aria-label={`Arrival at ${toLocationName} at Gleis 12`}
        />
      </div>
      <CommunityRatingSection value={3} aria-label="Community rating section" />
    </Card>
  );
}

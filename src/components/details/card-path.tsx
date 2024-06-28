import React from "react";
import * as OJP from "ojp-sdk";
import { Card } from "@/components/ui/card";
import TrainInfoSection from "@/components/details/train-info-section";
import LocationSection from "@/components/details/location-section";
import CommunityRatingSection from "@/components/details/community-rating-section";
import { useJourneyStore } from "@/store/useJourneyStore";

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

  const { setSelectedTripLeg } = useJourneyStore();

  React.useEffect(() => {
    setSelectedTripLeg(selectedLeg);
  }, [index, setSelectedTripLeg, selectedLeg]);

  return (
    <Card>
      <TrainInfoSection leg={selectedLeg} legDuration={legDuration} />
      <div className="flex gap-6 px-6">
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

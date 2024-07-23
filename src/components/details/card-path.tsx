import React, { useEffect, useState } from "react";
import * as OJP from "ojp-sdk";
import { Card } from "@/components/ui/card";
import InfoSection from "@/components/details/info-section";
import LocationSection from "@/components/details/location-section";
import CommunityRatingSection from "@/components/details/community-rating-section";
import { useJourneyStore } from "@/store/useJourneyStore";
import { useMediaQuery } from "react-responsive";
import {
  getPlatformNumberFromDestination,
  getPlatformNumberFromOrigin,
} from "@/utils/getPlatformNumber";
import { usePlatformStore } from "@/store/usePlatformStore";
import {
  getCachedPlatformFromDestination,
  getCachedPlatformFromOrigin,
} from "@/cache/getCachedPlatform";
import { Platform } from "@/types/Platform";
import { accessIconProps } from "@/helpers/accessIconProps";
import { getArrivalTime } from "@/utils/getArrivalTime";
import { getDepartureTime } from "@/utils/getDepartureTime";

interface CardPathProps {
  index: number;
  leg: OJP.TripLeg;
  legDuration: number;
  accessIcons: accessIconProps;
}

/**
 * CardPath component displays details of a specific leg of a journey.
 *
 * @param {CardPathProps} props - The properties passed to the component.
 * @returns {React.ReactElement} The CardPath component.
 */
export default function CardPath({
  index,
  leg,
  legDuration,
  accessIcons,
}: CardPathProps): React.ReactElement {
  const selectedLeg = leg;
  const fromLocationName = selectedLeg.fromLocation.locationName ?? "N/A";
  const toLocationName = selectedLeg.toLocation.locationName ?? "N/A";
  const platformNrFromLocation = getPlatformNumberFromOrigin(selectedLeg);
  const platformNrToLocation = getPlatformNumberFromDestination(selectedLeg);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const depTime = getDepartureTime(selectedLeg);
  const departureTime = "Abfahrt  " + depTime;
  const arrTime = getArrivalTime(selectedLeg);
  const arrivalTime = "Ankunft  " + arrTime;

  const { setSelectedTripLeg } = useJourneyStore();
  const { setPlatformOrigin, setPlatformDestination } = usePlatformStore();

  const [platformOrigin, setLocalPlatformOrigin] = useState<Platform | null>(
    null,
  );
  const [platformDestination, setLocalPlatformDestination] =
    useState<Platform | null>(null);

  useEffect(() => {
    setSelectedTripLeg(selectedLeg);

    async function fetchPlatform() {
      const originPlatform = await getCachedPlatformFromOrigin(selectedLeg);
      const destinationPlatform =
        await getCachedPlatformFromDestination(selectedLeg);
      setLocalPlatformOrigin(originPlatform);
      setLocalPlatformDestination(destinationPlatform);
      setPlatformOrigin(originPlatform);
      setPlatformDestination(destinationPlatform);
    }

    fetchPlatform().then((r) => r);
  }, [
    index,
    setSelectedTripLeg,
    selectedLeg,
    setPlatformOrigin,
    setPlatformDestination,
  ]);

  return (
    <Card>
      <InfoSection leg={selectedLeg} legDuration={legDuration} />
      <div className={`flex gap-6 px-6 ${!isMobile ? "" : "flex-col"}`}>
        <LocationSection
          locationName={fromLocationName}
          platform={platformOrigin}
          platformNr={platformNrFromLocation}
          accessIconLocationProps={accessIcons.origin}
          selectedLeg={selectedLeg}
          time={departureTime}
          aria-label={`Departure from ${fromLocationName} at ${platformNrFromLocation}`}
        />
        <LocationSection
          locationName={toLocationName}
          platform={platformDestination}
          platformNr={platformNrToLocation}
          accessIconLocationProps={accessIcons.destination}
          selectedLeg={selectedLeg}
          time={arrivalTime}
          aria-label={`Arrival at ${toLocationName} at ${platformNrToLocation}`}
        />
      </div>
      <CommunityRatingSection value={3} aria-label="Community rating section" />
    </Card>
  );
}

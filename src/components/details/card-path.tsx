import React, { useEffect, useState } from "react";
import * as OJP from "ojp-sdk";
import { Card } from "@/components/ui/card";
import InfoSection from "@/components/details/info-section";
import LocationSection from "@/components/details/location-section";
import CommunityRatingSection from "@/components/details/community-rating-section";
import { useJourneyStore } from "@/store/useJourneyStore";
import { useMediaQuery } from "react-responsive";
import {
  useFromStopPointVehicleAccessType,
  useToStopPointVehicleAccessType,
} from "@/hooks/useVehicleAccessType";
import { getAccessIcon } from "@/utils/handleAccessibilityIcon";
import { useTheme } from "next-themes";
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
  const platformNrFromLocation = getPlatformNumberFromOrigin(selectedLeg);
  const platformNrToLocation = getPlatformNumberFromDestination(selectedLeg);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { setSelectedTripLeg } = useJourneyStore();
  const { setPlatformOrigin, setPlatformDestination } = usePlatformStore();

  const [platformOrigin, setLocalPlatformOrigin] = useState<Platform | null>(
    null,
  );
  const [platformDestination, setLocalPlatformDestination] =
    useState<Platform | null>(null);

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
          accessIconLocationProps={accessIconFromLocationProps}
          aria-label={`Departure from ${fromLocationName} at ${platformNrFromLocation}`}
        />
        <LocationSection
          locationName={toLocationName}
          platform={platformDestination}
          platformNr={platformNrToLocation}
          accessIconLocationProps={accessIconToLocationProps}
          aria-label={`Arrival at ${toLocationName} at ${platformNrToLocation}`}
        />
      </div>
      <CommunityRatingSection value={3} aria-label="Community rating section" />
    </Card>
  );
}

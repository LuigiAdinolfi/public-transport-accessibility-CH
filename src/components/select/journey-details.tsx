"use client";

import React, { useEffect } from "react";
import { MultipleConnection } from "@/components/select/multiple-connection";
import { DirectConnection } from "@/components/select/direct-connection";
import { useJourneyStore } from "@/store/useJourneyStore";
import { formatDuration } from "@/utils/formatDuration";

/**
 * Component rendering journey details including multiple or direct connections.
 * @returns {React.ReactElement} - The rendered journey details component.
 */
export default function JourneyDetails(): React.ReactElement {
  const { tripDetails, setTripDetails } = useJourneyStore();

  useEffect(() => {
    const tripDetails = window.localStorage.getItem("tripDetails");
    if (tripDetails) {
      const parsedTripDetails = JSON.parse(tripDetails);
      setTripDetails(parsedTripDetails);
    }
  }, [setTripDetails]);

  return (
    <div className="space-y-6 px-6 pt-0">
      {tripDetails.map((trip, index) => {
        const {
          legs,
          stats: { duration: totalDuration },
        } = trip;
        const duration = formatDuration(totalDuration);

        return legs.length === 1 ? (
          <DirectConnection
            key={index}
            allLegs={legs}
            duration={duration}
            aria-label="Direct connection"
          />
        ) : (
          <MultipleConnection
            key={index}
            allLegs={legs}
            duration={duration}
            aria-label="Multiple connections"
          />
        );
      })}
    </div>
  );
}

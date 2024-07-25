"use client";

import React, { useEffect } from "react";
import { MultipleConnection } from "@/components/select/multiple-connection";
import { DirectConnection } from "@/components/select/direct-connection";
import { useJourneyStore } from "@/store/useJourneyStore";
import { formatDuration } from "@/utils/formatDuration";

/**
 * Component rendering journey details including multiple or direct connections.
 *
 * This component fetches journey details from local storage, parses them, and uses them to
 * render either a `DirectConnection` or a `MultipleConnection` component based on the
 * number of legs in each journey.
 *
 * @returns {React.ReactElement} - The rendered journey details component.
 */
export default function JourneyDetails(): React.ReactElement {
  // Extract state and setter function from the journey store
  const { tripDetails, setTripDetails } = useJourneyStore();

  useEffect(() => {
    // Fetch trip details from local storage on component mount
    const tripDetails = window.localStorage.getItem("tripDetails");

    if (tripDetails) {
      // Parse the trip details and update the state
      const parsedTripDetails = JSON.parse(tripDetails);
      setTripDetails(parsedTripDetails);
    }
  }, [setTripDetails]); // Dependency array ensures the effect runs only once

  return (
    <div className="space-y-6 px-6 pt-0">
      {tripDetails.map((trip, index) => {
        const {
          legs,
          stats: { duration: totalDuration },
        } = trip;

        // Format the total duration of the trip
        const duration = formatDuration(totalDuration);

        // Render DirectConnection or MultipleConnection based on the number of legs
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

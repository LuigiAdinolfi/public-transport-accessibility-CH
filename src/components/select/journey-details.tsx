import React from "react";
import { MultipleConnection } from "@/components/select/multiple-connection";
import { DirectConnection } from "@/components/select/direct-connection";
import { useJourneyStore } from "@/store/useJourneyStore";
import { formatDuration } from "@/utils/formatDuration";

/**
 * Component rendering journey details including multiple or direct connections.
 * @returns {React.ReactElement} - The rendered journey details component.
 */
export default function JourneyDetails(): React.ReactElement {
  const { tripDetails } = useJourneyStore();

  return (
    <div className="space-y-6 p-6 pt-0">
      {tripDetails.map((trip, index) => {
        const {
          legs,
          stats: { duration: totalDuration },
        } = trip;
        const duration = formatDuration(totalDuration);

        return legs.length === 1 ? (
          <DirectConnection key={index} allLegs={legs} duration={duration} />
        ) : (
          <MultipleConnection key={index} allLegs={legs} duration={duration} />
        );
      })}
    </div>
  );
}

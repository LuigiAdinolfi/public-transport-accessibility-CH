import React from "react";
import { MultipleConnection } from "@/components/select/multiple-connection";
import { DirectConnection } from "@/components/select/direct-connection";
import { useJourneyStore } from "@/store/useJourneyStore";
import { formatDuration } from "@/utils/handleDate";

/**
 * Component rendering journey details including multiple or direct connections.
 * @returns {React.ReactElement} - The rendered journey details component.
 */
export default function JourneyDetails(): React.ReactElement {
  const { tripDetails } = useJourneyStore();

  return (
    <div className="space-y-6 p-6 pt-0">
      {tripDetails.map((trip, index) => {
        const legs = trip.legs;
        const totalDuration = trip.stats.duration;
        const duration = formatDuration(totalDuration);
        if (legs.length === 1) {
          return (
            <DirectConnection key={index} allLegs={legs} duration={duration} />
          );
        } else {
          return (
            <MultipleConnection
              key={index}
              allLegs={legs}
              duration={duration}
            />
          );
        }
      })}
    </div>
  );
}

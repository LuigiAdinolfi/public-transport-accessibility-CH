import { Card } from "@/components/ui/card";
import * as React from "react";
import SelectOptionsHeader from "@/components/select/select-options-header";
import JourneyDetails from "@/components/select/journey-details";
import NextConnections from "@/components/select/next-connections";
import PreviousConnections from "@/components/select/previous-connections";

/**
 * Component representing a card for selecting journey options.
 *
 * This component encapsulates various sections related to journey selection:
 * - A header with select options.
 * - A Button to select previous connections.
 * - A section with journey details.
 * - A Button to select next connections.
 *
 * @returns {React.ReactElement} JSX element representing the journey selection card.
 */
export function CardSelectJourney(): React.ReactElement {
  return (
    <Card className="mt-4">
      {/* Container for the select options header */}
      <div className="flex flex-col space-y-1.5 px-6 pb-3 pt-6">
        <SelectOptionsHeader />
      </div>

      {/* Container for previous connections section */}
      <div className="mt-4 flex flex-col space-y-1.5 px-6 pb-4">
        <PreviousConnections />
      </div>

      {/* Container for journey details section */}
      <JourneyDetails />

      {/* Container for next connections section */}
      <div className="flex flex-col space-y-1.5 px-6 pb-8 pt-4">
        <NextConnections />
      </div>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import * as React from "react";
import SelectOptionsHeader from "@/components/select/select-options-header";
import JourneyDetails from "@/components/select/journey-details";
import NextConnections from "@/components/select/next-connections";

/**
 * Component representing a card to select journey options.
 * @returns {React.ReactElement} JSX Element representing the journey selection card.
 */
export function CardSelectJourney(): React.ReactElement {
  return (
    <Card className="mt-4">
      <div className="flex flex-col space-y-1.5 px-6 pb-3 pt-6">
        <SelectOptionsHeader />
      </div>
      <JourneyDetails />
      <div className="flex flex-col space-y-1.5 px-6 pb-8 pt-3">
        <NextConnections />
      </div>
    </Card>
  );
}

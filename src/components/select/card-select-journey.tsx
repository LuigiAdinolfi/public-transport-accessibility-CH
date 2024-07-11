import { Card } from "@/components/ui/card";
import * as React from "react";
import SelectOptionsHeader from "@/components/select/select-options-header";
import JourneyDetails from "@/components/select/journey-details";

/**
 * Component representing a card to select journey options.
 * @returns {React.ReactElement} JSX Element representing the journey selection card.
 */
export function CardSelectJourney(): React.ReactElement {
  return (
    <Card className="mt-3">
      <div className="flex flex-col space-y-1.5 p-6">
        <SelectOptionsHeader />
      </div>
      <JourneyDetails />
    </Card>
  );
}

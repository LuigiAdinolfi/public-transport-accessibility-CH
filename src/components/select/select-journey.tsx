import * as React from "react";
import { CardSelectJourney } from "@/components/select/card-select-journey";
import HeaderButtons from "@/components/shared/header-buttons";

/**
 * Component for selecting a journey.
 *
 * This component serves as the main container for journey selection functionality. It includes
 * a header section with buttons and a card component for selecting the journey details.
 *
 * @returns {React.ReactElement} The rendered component for selecting a journey.
 */
export function SelectJourney(): React.ReactElement {
  return (
    <div
      className="mx-auto w-full max-w-screen-lg px-0"
      role="region"
      aria-labelledby="select-journey-heading"
    >
      <h1 id="select-journey-heading" className="sr-only">
        Reise auswählen
      </h1>
      {/* Header section containing navigation or action buttons */}
      <HeaderButtons />

      {/* Card component for selecting journey details */}
      <CardSelectJourney />
    </div>
  );
}

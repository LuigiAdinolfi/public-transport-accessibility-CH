import * as React from "react";
import { CardSelectJourney } from "@/components/select/card-select-journey";
import HeaderButtons from "@/components/shared/header-buttons";

/**
 * Component for selecting a journey.
 * @returns {React.ReactElement} The select journey component.
 */
export function SelectJourney(): React.ReactElement {
  return (
    <div
      className="w-full lg:w-[960px]"
      role="region"
      aria-labelledby="select-journey-heading"
    >
      <h1 id="select-journey-heading" className="sr-only">
        Select Journey
      </h1>
      <HeaderButtons />
      <CardSelectJourney />
    </div>
  );
}

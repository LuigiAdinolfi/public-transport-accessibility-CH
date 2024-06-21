import { HelpButton } from "@/components/shared/help-button";
import * as React from "react";
import { BackButton } from "@/components/shared/back-button";
import { CardSelectJourney } from "@/components/select/card-select-journey";

/**
 * Component for selecting a journey.
 * @returns {JSX.Element} JSX Element
 */
export function SelectJourney() {
  return (
    <div className="w-full lg:w-[960px]">
      <div className="mt-1 flex items-center justify-between">
        <BackButton />
        <HelpButton />
      </div>
      <CardSelectJourney />
    </div>
  );
}

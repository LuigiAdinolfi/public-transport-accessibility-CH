import { HelpButton } from "@/components/shared/help-button";
import * as React from "react";
import { BackButton } from "@/components/shared/back-button";
import { CardSelectJourney } from "@/components/select/card-select-journey";

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

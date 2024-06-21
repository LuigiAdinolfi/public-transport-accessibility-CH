import { HelpButton } from "@/components/shared/help-button";
import * as React from "react";
import { BackButton } from "@/components/shared/back-button";
import { CardStopPoint } from "@/components/stop/card-stop-point";

/**
 * Component representing the stop point details page.
 * @returns {JSX.Element} - StopPoint component.
 */
export function StopPoint() {
  return (
    <div className="w-full lg:w-[960px]">
      {/* Header with BackButton and HelpButton */}
      <div className="mt-1 flex items-center justify-between">
        <BackButton />
        <HelpButton />
      </div>

      {/* Card displaying stop point details */}
      <CardStopPoint />
    </div>
  );
}

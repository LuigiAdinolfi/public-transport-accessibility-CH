import * as React from "react";
import CardStopPoint from "@/components/stop/card-stop-point";
import HeaderButtons from "@/components/shared/header-buttons";

/**
 * Component representing a stop point details page.
 * @returns {React.ReactElement} - StopPoint component.
 */
export function StopPoint(): React.ReactElement {
  return (
    <div className="mx-auto w-full max-w-screen-lg px-0">
      {/* Header with BackButton and HelpButton */}
      <HeaderButtons />

      {/* Card displaying stop point details */}
      <CardStopPoint />
    </div>
  );
}

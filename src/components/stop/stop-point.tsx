import * as React from "react";
import CardStopPoint from "@/components/stop/card-stop-point";
import HeaderButtons from "@/components/shared/header-buttons";

/**
 * Component representing the stop point details page.
 * This page displays detailed information about a specific stop point,
 * including navigation and context-specific controls.
 *
 * @returns {React.ReactElement} - The StopPoint component.
 */
export function StopPoint(): React.ReactElement {
  return (
    <div className="mx-auto w-full max-w-screen-lg px-0">
      {/* Header with navigation buttons */}
      <HeaderButtons />

      {/* Card displaying detailed information about the stop point */}
      <CardStopPoint />
    </div>
  );
}

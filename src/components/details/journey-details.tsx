"use client";

import React, { useState, useEffect } from "react";
import { useJourneyStore } from "@/store/useJourneyStore";
import HeaderButtons from "@/components/shared/header-buttons";
import TabNavigation from "@/components/details/tab-navigation";

/**
 * JourneyDetails component displays details of a journey including header buttons and tab navigation.
 *
 * @returns {React.ReactElement} The rendered JourneyDetails component.
 */
export function JourneyDetails(): React.ReactElement {
  const [activeLegTab, setActiveLegTab] = useState<string>("leg-0");
  const { allLegs, indexTripSelected } = useJourneyStore();

  // Set active leg tab when indexTripSelected or allLegs change
  useEffect(() => {
    if (allLegs && allLegs.length > 0) {
      setActiveLegTab(`leg-${indexTripSelected}`);
    }
  }, [indexTripSelected, allLegs]);

  // If no TimedLegs are found, return empty fragment
  if (allLegs.length === 0) return <></>;

  return (
    <div className="mx-auto w-full max-w-screen-lg px-0">
      {/* Render header buttons */}
      <HeaderButtons />
      {/* Render tab navigation with journey legs */}
      <TabNavigation
        legs={allLegs}
        activeLegTab={activeLegTab}
        setActiveLegTab={setActiveLegTab}
      />
    </div>
  );
}

export default JourneyDetails;

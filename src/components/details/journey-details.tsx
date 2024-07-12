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

  // Filter out only TimedLegs
  const legs = allLegs.filter((leg) => leg.legType === "TimedLeg") || [];

  // Set active leg tab when indexTripSelected or allLegs change
  useEffect(() => {
    if (allLegs && allLegs.length > 0) {
      setActiveLegTab(`leg-${indexTripSelected}`);
    }
  }, [indexTripSelected, allLegs]);

  // If no TimedLegs are found, return empty fragment
  if (legs.length === 0) return <></>;

  return (
    <div className="mx-auto w-full max-w-screen-lg px-0">
      <HeaderButtons />
      <TabNavigation
        legs={legs}
        activeLegTab={activeLegTab}
        setActiveLegTab={setActiveLegTab}
      />
    </div>
  );
}

export default JourneyDetails;

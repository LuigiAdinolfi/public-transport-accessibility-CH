"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { useState } from "react";

import { CardRecentJourneys } from "@/components/plan/card-recent-journeys";
import { useTheme } from "next-themes";
import {
  DarkActiveCircle,
  LightActiveCircle,
} from "@/assets/icons/active-circle";
import {
  DarkInactiveCircle,
  LightInactiveCircle,
} from "@/assets/icons/inactive-circle";
import { CardNewJourney } from "@/components/plan/card-new-journey";
import { HelpButton } from "@/components/shared/help-button";

/**
 * Component representing the journey planning card.
 * @returns JSX.Element
 */
export function PlanJourney() {
  // State variables
  const [activeJourneyTab, setActiveJourneyTab] = useState("new-journey");

  // Theme hook
  const { resolvedTheme } = useTheme();

  // Function to swap origin and destination
  return (
    <Tabs
      defaultValue={activeJourneyTab}
      className="lg:w-[960px] w-full"
      onValueChange={(value) => setActiveJourneyTab(value)}
    >
      <div className="flex justify-between items-center">
        <TabsList className="grid lg:w-1/2 grid-cols-2 lg:h-12">
          <TabsTrigger
            className="lg:h-10 lg:text-base mx-1"
            value="new-journey"
          >
            {resolvedTheme === "dark" ? (
              activeJourneyTab === "new-journey" ? (
                <DarkActiveCircle />
              ) : (
                <DarkInactiveCircle />
              )
            ) : activeJourneyTab === "new-journey" ? (
              <LightActiveCircle />
            ) : (
              <LightInactiveCircle />
            )}

            <div className="lg:pl-2 pl-1">Neue Reise</div>
          </TabsTrigger>
          <TabsTrigger
            className="lg:h-10 lg:text-base mx-1"
            value="recent-journeys"
          >
            {resolvedTheme === "dark" ? (
              activeJourneyTab === "recent-journeys" ? (
                <DarkActiveCircle />
              ) : (
                <DarkInactiveCircle />
              )
            ) : activeJourneyTab === "recent-journeys" ? (
              <LightActiveCircle />
            ) : (
              <LightInactiveCircle />
            )}
            <div className="lg:pl-2 pl-1">Letzte Reisen</div>
          </TabsTrigger>
        </TabsList>
        <HelpButton />
      </div>
      <TabsContent value="new-journey">
        <CardNewJourney />
      </TabsContent>
      <TabsContent value="recent-journeys">
        <CardRecentJourneys />
      </TabsContent>
    </Tabs>
  );
}

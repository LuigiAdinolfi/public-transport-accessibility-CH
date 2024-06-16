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
      className="w-full lg:w-[960px]"
      onValueChange={(value) => setActiveJourneyTab(value)}
    >
      <div className="flex items-center justify-between">
        <TabsList className="grid grid-cols-2 lg:h-12 lg:w-1/2">
          <TabsTrigger
            className="mx-1 text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:h-10 lg:text-base"
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

            <div className="pl-1 lg:pl-2">Neue Reise</div>
          </TabsTrigger>
          <TabsTrigger
            className="mx-1 text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:h-10 lg:text-base"
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
            <div className="pl-1 lg:pl-2">Letzte Reisen</div>
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

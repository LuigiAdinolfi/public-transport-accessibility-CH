"use client";

import * as React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardRecentJourneys } from "@/components/plan/card-recent-journeys";
import { useTheme } from "next-themes";
import { CardNewJourney } from "@/components/plan/card-new-journey";
import { HelpButton } from "@/components/shared/help-button";
import { CircleIcons } from "@/components/details/circle-icons";

type ActiveTab = "new-journey" | "recent-journeys";

/**
 * Component representing the journey planning card with tabs for new and recent journeys.
 *
 * Manages the state for the active tab and handles theme changes.
 *
 * @returns {React.ReactElement} The rendered JSX element representing the PlanJourney component.
 */
export function PlanJourney(): React.ReactElement {
  // State to keep track of the currently active tab
  const [activeJourneyTab, setActiveJourneyTab] =
    useState<ActiveTab>("new-journey");

  // Theme hook to determine the current theme
  const { resolvedTheme } = useTheme();

  return (
    <Tabs
      defaultValue={activeJourneyTab}
      className="mx-auto w-full max-w-screen-lg px-0"
      onValueChange={(value) => setActiveJourneyTab(value as ActiveTab)} // Cast value to ActiveTab
    >
      <div className="flex flex-col">
        {/* Mobile variant of HelpButton */}
        <div className="flex justify-end pb-6 md:hidden">
          <HelpButton />
        </div>

        <div className="flex items-center justify-between">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 lg:h-12">
            <TabsTrigger
              className="mx-1 items-center text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:h-10"
              value="new-journey"
            >
              <CircleIcons
                active={activeJourneyTab === "new-journey"}
                darkTheme={resolvedTheme === "dark"}
              />
              <div className="pl-1 md:text-lg lg:pl-2">Neue Reise</div>
            </TabsTrigger>
            <TabsTrigger
              className="mx-1 text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:h-10"
              value="recent-journeys"
            >
              <CircleIcons
                active={activeJourneyTab === "recent-journeys"}
                darkTheme={resolvedTheme === "dark"}
              />
              <div className="pl-1 md:text-lg lg:pl-2">Letzte Reisen</div>
            </TabsTrigger>
          </TabsList>

          {/* Desktop variant of HelpButton */}
          <div className="mb-2 hidden md:flex">
            <HelpButton />
          </div>
        </div>

        <TabsContent value="new-journey">
          <CardNewJourney />
        </TabsContent>
        <TabsContent value="recent-journeys">
          <CardRecentJourneys />
        </TabsContent>
      </div>
    </Tabs>
  );
}

"use client";

import * as React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardRecentJourneys } from "@/components/plan/card-recent-journeys";
import { useTheme } from "next-themes";
import { DarkActiveCircle, LightActiveCircle } from "@/assets/icons/active-circle";
import { DarkInactiveCircle, LightInactiveCircle } from "@/assets/icons/inactive-circle";
import { CardNewJourney } from "@/components/plan/card-new-journey";
import { HelpButton } from "@/components/shared/help-button";

/**
 * Component representing the journey planning card.
 * @returns {JSX.Element} - PlanJourney component.
 */
export function PlanJourney() {
  // State variables
  const [activeJourneyTab, setActiveJourneyTab] = useState("new-journey");

  // Theme hook
  const { resolvedTheme } = useTheme();

  // Function to render the active/inactive circle based on the theme and active tab
  const renderCircle = (tab: string, isActive: boolean) => {
    if (resolvedTheme === "dark") {
      return isActive ? <DarkActiveCircle /> : <DarkInactiveCircle />;
    } else {
      return isActive ? <LightActiveCircle /> : <LightInactiveCircle />;
    }
  };

  return (
    <Tabs
      defaultValue={activeJourneyTab}
      className="w-full lg:w-[960px]"
      onValueChange={(value) => setActiveJourneyTab(value)}
    >
      <div className="flex flex-col">
        {/* Mobile variant of HelpButton */}
        <div className="flex md:hidden justify-end pb-6">
          <HelpButton />
        </div>

        <div className="flex items-center justify-between">
          <TabsList className="grid grid-cols-2 lg:h-12 md:w-1/2 w-full">
            <TabsTrigger
              className="mx-1 text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:h-10 lg:text-base"
              value="new-journey"
            >
              {renderCircle("new-journey", activeJourneyTab === "new-journey")}
              <div className="pl-1 lg:pl-2 md:text-base">Neue Reise</div>
            </TabsTrigger>
            <TabsTrigger
              className="mx-1 text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:h-10 lg:text-base"
              value="recent-journeys"
            >
              {renderCircle("recent-journeys", activeJourneyTab === "recent-journeys")}
              <div className="pl-1 lg:pl-2 md:text-base">Letzte Reisen</div>
            </TabsTrigger>
          </TabsList>

          {/* Desktop variant of HelpButton */}
          <div className="hidden md:flex">
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

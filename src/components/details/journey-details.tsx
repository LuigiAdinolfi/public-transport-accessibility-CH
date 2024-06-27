"use client";

import { HelpButton } from "@/components/shared/help-button";
import * as React from "react";
import { BackButton } from "@/components/shared/back-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { DarkActiveCircle, LightActiveCircle } from "@/assets/icons/active-circle";
import { DarkInactiveCircle, LightInactiveCircle } from "@/assets/icons/inactive-circle";
import { CardPath } from "@/components/details/card-path";
import { DummyMap } from "@/components/details/dummy-map";
import { useJourneyStore } from "@/store/useJourneyStore";

export function JourneyDetails() {
  const [activeLegTab, setActiveLegTab] = useState("leg-0");
  const { resolvedTheme } = useTheme();
  const { allLegs, indexTripSelected } = useJourneyStore();
  const legs = allLegs.filter((leg) => leg.legType === "TimedLeg") || [];

  useEffect(() => {
    if (allLegs && allLegs.length > 0) {
      setActiveLegTab(`leg-${indexTripSelected}`);
    }
  }, [indexTripSelected, allLegs]);

  if (legs.length === 0) return null;

  return (
    <div className="w-full lg:w-[960px]">
      <div className="mt-1 flex items-center justify-between">
        <BackButton />
        <HelpButton />
      </div>
      <Tabs
        defaultValue={activeLegTab}
        onValueChange={(value) => setActiveLegTab(value)}
      >
        <div className="flex items-center justify-between pt-3">
          <TabsList className="grid lg:h-12 lg:w-full" style={{ gridTemplateColumns: `repeat(${legs.length}, 1fr)` }}>
            {legs.map((leg, index) => {
                const fromLocationName = leg.fromLocation.locationName;
                const toLocationName = leg.toLocation.locationName;
                return (
                  <TabsTrigger
                    key={index}
                    className="mx-1 text-zinc-700 active:text-zinc-950 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:active:text-white lg:h-10 lg:text-base"
                    value={`leg-${index}`}
                  >
                    {resolvedTheme === "dark" ? (
                      activeLegTab === `leg-${index}` ? (
                        <DarkActiveCircle />
                      ) : (
                        <DarkInactiveCircle />
                      )
                    ) : activeLegTab === `leg-${index}` ? (
                      <LightActiveCircle />
                    ) : (
                      <LightInactiveCircle />
                    )}
                    <div className="pl-1 lg:pl-2 md:text-base">
                      {fromLocationName} - {toLocationName}
                    </div>
                  </TabsTrigger>
                );
              }
            )}
          </TabsList>
        </div>

        {legs.map((leg, index) => (
          <TabsContent key={index} value={`leg-${index}`}>
            <CardPath index={index} legs={legs} />
            <DummyMap />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

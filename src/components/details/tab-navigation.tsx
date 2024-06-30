import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import * as OJP from "ojp-sdk";
import CardPath from "@/components/details/card-path";
import { DummyMap } from "@/components/details/dummy-map";
import { useJourneyStore } from "@/store/useJourneyStore";
import { CircleIcons } from "@/components/details/circle-icons";
import { handleLocation } from "@/utils/tripUtils";

interface TabNavigationProps {
  legs: OJP.TripLeg[];
  activeLegTab: string;
  setActiveLegTab: (value: string) => void;
}

/**
 * TabNavigation component manages tabs for journey legs and renders corresponding details.
 *
 * @param {TabNavigationProps} props - Props for TabNavigation component.
 * @returns {React.ReactElement} TabNavigation component.
 */
export default function TabNavigation({
  legs,
  activeLegTab,
  setActiveLegTab,
}: TabNavigationProps): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const { allLegs } = useJourneyStore();

  // Filter TransferLegs from allLegs
  const transferLegs =
    allLegs.filter((leg) => leg.legType === "TimedLeg") || [];

  return (
    <Tabs
      defaultValue={activeLegTab}
      onValueChange={(value) => setActiveLegTab(value)}
    >
      <div className="flex items-center justify-between pt-3">
        {/* TabsList for displaying leg tabs */}
        <TabsList
          className="grid w-full grid-cols-2 lg:h-12"
          style={{ gridTemplateColumns: `repeat(${legs.length}, 1fr)` }}
        >
          {legs.map((leg, index) => {
            const fromLocationName = leg.fromLocation.locationName;
            let fromLocation = handleLocation(
              fromLocationName,
              transferLegs?.length ?? 0,
            );

            const toLocationName = leg.toLocation.locationName;
            let toLocation = handleLocation(
              toLocationName,
              transferLegs?.length ?? 0,
            );
            return (
              <TabsTrigger
                key={index}
                className="mx-1 bg-zinc-100 text-zinc-700 active:text-zinc-950 dark:bg-zinc-800 dark:text-zinc-300 dark:active:text-white lg:h-10 lg:text-base"
                value={`leg-${index}`}
              >
                {/* CircleIcons component indicating active tab */}
                <CircleIcons
                  active={activeLegTab === `leg-${index}`}
                  darkTheme={resolvedTheme === "dark"}
                />
                <div className="pl-1 md:text-base lg:pl-2">
                  {fromLocation} - {toLocation}
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {/* TabsContent for rendering details of each leg */}
      {legs.map((_leg, index) => {
        const legDuration = transferLegs[index]?.legDuration?.totalMinutes;
        return (
          <TabsContent key={index} value={`leg-${index}`}>
            <CardPath
              index={index}
              legs={legs}
              legDuration={legDuration ?? 0}
            />
            <DummyMap />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

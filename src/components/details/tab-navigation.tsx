import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import * as OJP from "ojp-sdk";
import CardPath from "@/components/details/card-path";
import { DummyMap } from "@/components/details/dummy-map";
import { useJourneyStore } from "@/store/useJourneyStore";
import { CircleIcons } from "@/components/details/circle-icons";
import { handleLocation } from "@/utils/handleLocation";

interface TabNavigationProps {
  legs: OJP.TripLeg[];
  activeLegTab: string;
  setActiveLegTab: (value: string) => void;
}

/**
 * TabNavigation component manages tabs for different journey legs and renders corresponding details.
 *
 * @param {TabNavigationProps} props - The properties for the TabNavigation component.
 * @param {OJP.TripLeg[]} props.legs - Array of trip legs to be displayed in the tabs.
 * @param {string} props.activeLegTab - The currently active tab value.
 * @param {(value: string) => void} props.setActiveLegTab - Function to set the active tab value.
 * @returns {React.ReactElement} The rendered TabNavigation component.
 */
export default function TabNavigation({
                                        legs,
                                        activeLegTab,
                                        setActiveLegTab,
                                      }: TabNavigationProps): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const { accessIcons } = useJourneyStore();

  // Filter timed legs and transfer legs from the provided journey legs
  const timedLegs = legs.filter((leg) => leg.legType === "TimedLeg") || [];
  const transferLegs =
    legs.filter((leg) => leg.legType === "TransferLeg") || [];

  return (
    <Tabs
      defaultValue={activeLegTab}
      onValueChange={(value) => setActiveLegTab(value)}
    >
      <div className="flex items-center justify-between pt-4">
        {/* TabsList for displaying the tabs corresponding to each leg */}
        <TabsList
          className="grid w-full grid-cols-2 lg:h-14"
          style={{ gridTemplateColumns: `repeat(${timedLegs.length}, 1fr)` }}
        >
          {timedLegs.map((leg, index) => {
            const fromLocationName = leg.fromLocation.locationName;
            let fromLocation = handleLocation(
              fromLocationName,
              timedLegs.length,
            );

            const toLocationName = leg.toLocation.locationName;
            let toLocation = handleLocation(toLocationName, timedLegs.length);

            return (
              <TabsTrigger
                key={index}
                className="mx-1 bg-zinc-100 text-zinc-700 active:text-zinc-950 dark:bg-zinc-800 dark:text-zinc-300 dark:active:text-white lg:h-12 lg:text-base"
                value={`leg-${index}`}
              >
                {/* CircleIcons component indicating whether this tab is active */}
                <CircleIcons
                  active={activeLegTab === `leg-${index}`}
                  darkTheme={resolvedTheme === "dark"}
                />
                <div className="pl-1 font-semibold md:text-lg lg:pl-2">
                  {fromLocation} - {toLocation}
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {/* TabsContent for rendering details of each selected leg */}
      {timedLegs.map((leg, index) => {
        const legDuration = transferLegs[index]?.legDuration?.totalMinutes;
        return (
          <TabsContent key={index} value={`leg-${index}`}>
            <CardPath
              index={index}
              leg={leg}
              legDuration={legDuration ?? 0}
              accessIcons={accessIcons[index]}
            />
            <DummyMap />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

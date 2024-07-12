import * as React from "react";
import { ArrowRightLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { DatePicker } from "@/components/plan/date-picker";
import JourneyPointInput from "@/components/plan/journey-point-input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJourneyStore } from "@/store/useJourneyStore";
import { handleFormSubmit } from "@/utils/handleFormSubmit";
import { useRouter } from "next/navigation";
import { CircleIcons } from "@/components/details/circle-icons";
import { swapLocations } from "@/utils/swapLocations";

type SearchTab = "Dep" | "Arr";

/**
 * CardNewJourney component for entering journey details and search.
 * @returns {React.ReactElement} CardNewJourney component.
 */
export function CardNewJourney(): React.ReactElement {
  const {
    activeSearchTab,
    origin,
    destination,
    selectedDate,
    setActiveSearchTab,
    setOrigin,
    setDestination,
    setTripDetails,
  } = useJourneyStore();
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const inputOrigin = origin?.locationName ?? "";
  const inputDestination = destination?.locationName ?? "";
  const date = selectedDate?.toISOString() ?? "";

  return (
    <Card>
      <CardHeader className="pb-8">
        <CardDescription className="text-zinc-600 md:text-base">
          Gib deine Reisedaten ein.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-10 pb-6 lg:space-y-12 lg:pb-12">
        {/* Origin and Destination Inputs */}
        <div className="space-y-1">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <JourneyPointInput
              placeholder="Von"
              onLocationSelected={setOrigin}
              value={inputOrigin}
              description="Gib den Abfahrtsort ein."
            />
            <div className="flex w-full items-center justify-center pt-4 lg:w-2/12 lg:pb-6">
              {/* Button to swap origin and destination */}
              <Button
                className="w-16"
                variant="outline"
                size="icon"
                onClick={() =>
                  swapLocations(origin, destination, setOrigin, setDestination)
                }
                aria-label="Ort wechseln"
              >
                <ArrowRightLeft />
              </Button>
            </div>
            <JourneyPointInput
              placeholder="Nach"
              onLocationSelected={setDestination}
              value={inputDestination}
              description="Gib den Zielort ein."
            />
          </div>
        </div>
        {/* Date and Time Picker */}
        <div className="space-y-1">
          <div className="flex flex-col items-center justify-between align-middle lg:flex-row">
            <div className="w-full space-y-1 lg:w-4/12">
              <Label className="text-base" htmlFor="datetime">
                Wann
              </Label>
              <DatePicker />
              <CardDescription className="pt-2 text-zinc-600 md:text-base">
                Gib Datum und Uhrzeit ein.
              </CardDescription>
            </div>
            {/* Tabs for Departure and Arrival */}
            <div className="mt-8 flex w-full content-center justify-center space-y-1 lg:mt-0 lg:pb-2">
              <Tabs
                defaultValue={activeSearchTab}
                onValueChange={(value: string) =>
                  setActiveSearchTab(value as SearchTab)
                } // Cast value to SearchTab
              >
                <TabsList className="content-center lg:w-64">
                  {/* Departure Tab Trigger */}
                  <TabsTrigger
                    className="w-32 items-center text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:w-32"
                    value="Dep"
                  >
                    <CircleIcons
                      active={activeSearchTab === "Dep"}
                      darkTheme={resolvedTheme === "dark"}
                      size="small"
                    />
                    <div className="pl-1 md:text-base lg:pl-2">Abreise</div>
                  </TabsTrigger>
                  {/* Arrival Tab Trigger */}
                  <TabsTrigger
                    className="w-32 text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:w-32"
                    value="Arr"
                  >
                    <CircleIcons
                      active={activeSearchTab === "Arr"}
                      darkTheme={resolvedTheme === "dark"}
                      size="small"
                    />
                    <div className="pl-1 md:text-base lg:pl-2">Ankunft</div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            {/* Search Button */}
            <div className="mt-16 flex w-full items-center justify-center lg:mt-0 lg:w-auto">
              <Button
                id="submit"
                type="submit"
                className="w-full md:text-base lg:mb-2 lg:w-44"
                onClick={() =>
                  handleFormSubmit(
                    origin,
                    destination,
                    date,
                    activeSearchTab,
                    setTripDetails,
                    router.push,
                  )
                }
              >
                Suche
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

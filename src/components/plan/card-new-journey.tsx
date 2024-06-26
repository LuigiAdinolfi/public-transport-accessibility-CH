"use client";

import * as React from "react";
import { ArrowRightLeft } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DarkActiveSmallCircle,
  LightActiveSmallCircle
} from "@/assets/icons/active-circle";
import {
  DarkInactiveSmallCircle,
  LightInactiveSmallCircle
} from "@/assets/icons/inactive-circle";
import { DatePicker } from "@/components/plan/date-picker";
import { useRouter } from "next/navigation";
import JourneyPointInput from "@/components/plan/journey-point-input";
import * as OJP from "ojp-sdk";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchTripRequest } from "@/api/openJourneyPlanner/fetch-trip-request";
import { useJourneyStore } from "@/store/useJourneyStore";

export function CardNewJourney() {

  const {
    activeSearchTab,
    origin,
    destination,
    selectedDate,
    setActiveSearchTab,
    setOrigin,
    setDestination,
    setTripDetails
  } = useJourneyStore();
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  /**
   * Handles the form submission by initiating a trip request with selected parameters.
   * @param {OJP.Location | null} origin - The origin location selected.
   * @param {OJP.Location | null} destination - The destination location selected.
   * @param {string} selectedDate - The selected date and time formatted in ISO format.
   * @param {"Dep" | "Arr"} activeSearchTab - The active search tab ('Dep' for departure, 'Arr' for arrival).
   */
  const handleFormSubmit = async (origin: OJP.Location | null, destination: OJP.Location | null, selectedDate: string, activeSearchTab: "Dep" | "Arr") => {
    if (!origin || !destination || !selectedDate) {
      console.error("Please select origin, destination, and date/time.");
      return;
    }

    try {
      const formattedDate = new Date(selectedDate);
      const response = await fetchTripRequest(origin.stopPlace?.stopPlaceRef ?? "", destination.stopPlace?.stopPlaceRef ?? "", formattedDate, activeSearchTab);
      // console.log("Response from fetchTripRequest:", response); // <-- Console log for response
      setTripDetails(response.trips);
      console.log("Trip details:", response.trips); // <-- Console log for trip details
      // Handle response as needed, e.g., navigate to result page
      router.push("/select");
    } catch (error) {
      console.error("Error fetching trip request:", error);
    }
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <Card>
      <CardHeader className="pb-8">
        <CardDescription className="text-zinc-600 md:text-base">
          Gib deine Reisedaten ein.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-10 lg:space-y-12 pb-6 lg:pb-12">
        <div className="space-y-1">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <JourneyPointInput
              placeholder="Von"
              onLocationSelected={setOrigin}
              value={origin?.locationName ?? ""}
              description="Gib den Abfahrtsort ein."
            />
            <div className="flex w-full lg:w-2/12 items-center justify-center pt-4 lg:pb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={swapLocations}
                aria-label="Ort wechseln"
              >
                <ArrowRightLeft />
              </Button>
            </div>
            <JourneyPointInput
              placeholder="Nach"
              onLocationSelected={setDestination}
              value={destination?.locationName ?? ""}
              description="Gib den Zielort ein."
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex flex-col lg:flex-row justify-between items-center align-middle">
            <div className="w-full lg:w-4/12 space-y-1">
              <Label className="text-base" htmlFor="datetime">Wann</Label>
              <DatePicker />
              <CardDescription className="pt-2 text-zinc-600 md:text-base">
                Gib Datum und Uhrzeit ein.
              </CardDescription>
            </div>
            <div className="flex justify-center mt-8 lg:mt-0 w-full content-center space-y-1 lg:pb-2">
              <Tabs
                defaultValue={activeSearchTab}
                onValueChange={(value) => setActiveSearchTab(value as "Dep" | "Arr")}
              >
                <TabsList className="content-center lg:w-64">
                  <TabsTrigger
                    className="w-32 text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:w-32"
                    value="Dep"
                  >
                    {resolvedTheme === "dark" ? (
                      activeSearchTab === "Dep" ? (
                        <DarkActiveSmallCircle aria-hidden="true" />
                      ) : (
                        <DarkInactiveSmallCircle aria-hidden="true" />
                      )
                    ) : activeSearchTab === "Dep" ? (
                      <LightActiveSmallCircle aria-hidden="true" />
                    ) : (
                      <LightInactiveSmallCircle aria-hidden="true" />
                    )}
                    <div className="pl-1 lg:pl-2 md:text-base">Abreise</div>
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-32 text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:w-32"
                    value="Arr"
                  >
                    {resolvedTheme === "dark" ? (
                      activeSearchTab === "Arr" ? (
                        <DarkActiveSmallCircle aria-hidden="true" />
                      ) : (
                        <DarkInactiveSmallCircle aria-hidden="true" />
                      )
                    ) : activeSearchTab === "Arr" ? (
                      <LightActiveSmallCircle aria-hidden="true" />
                    ) : (
                      <LightInactiveSmallCircle aria-hidden="true" />
                    )}
                    <div className="pl-1 lg:pl-2 md:text-base">Ankunft</div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="mt-16 lg:mt-0 w-full lg:w-auto flex justify-center items-center">
              <Button
                id="submit"
                type="submit"
                className="w-full lg:w-44 md:text-base lg:mb-2"
                onClick={() => handleFormSubmit(origin, destination, selectedDate, activeSearchTab)}
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

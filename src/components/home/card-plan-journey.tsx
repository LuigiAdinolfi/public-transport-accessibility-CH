"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  LightActiveCircle,
  LightActiveSmallCircle,
} from "@/assets/icons/light-active-circle";
import {
  LightInactiveCircle,
  LightInactiveSmallCircle,
} from "@/assets/icons/light-inactive-circle";
import { useTheme } from "next-themes";
import {
  DarkActiveCircle,
  DarkActiveSmallCircle,
} from "@/assets/icons/dark-active-circle";
import {
  DarkInactiveCircle,
  DarkInactiveSmallCircle,
} from "@/assets/icons/dark-inactive-circle";
import { CardRecentJourneys } from "@/components/home/card-recent-journeys";
import { ArrowRightLeft, MessageCircleQuestion } from "lucide-react";

/**
 * Component representing the journey planning card.
 * @returns JSX.Element
 */
export function CardPlanJourney() {
  // State variables
  const [activeJourneyTab, setActiveJourneyTab] = useState("new-journey");
  const [activeSearchTab, setActiveSearchTab] = useState("departure");
  const [origin, setOrigin] = useState("Basel");
  const [destination, setDestination] = useState("Brugg");
  const [datetime, setDatetime] = useState("");

  // Theme hook
  const { resolvedTheme } = useTheme();

  // Effect to set initial date and time
  useEffect(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localTime = new Date(now.getTime() - offset * 60000);
    const formattedDate = localTime.toISOString().slice(0, 16);
    setDatetime(formattedDate);
  }, []);

  // Function to swap origin and destination
  const swapLocations = () => {
    setOrigin((prevOrigin) => {
      setDestination(prevOrigin);
      return destination;
    });
  };

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
        <Button className="mr-4" variant="secondary">
          <MessageCircleQuestion className="mr-2 h-4 w-4" />
          Brauchst du Hilfe?
        </Button>
      </div>
      <TabsContent value="new-journey">
        <Card>
          <CardHeader className="pb-8">
            <CardDescription>Gib deine Reisedaten ein.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-12 pb-12">
            <div className="space-y-1">
              <div className="flex justify-between">
                <div className="space-y-1  w-5/12">
                  <Label htmlFor="origin">Von</Label>
                  <Input
                    id="origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                  <CardDescription className="pt-2">
                    Gib den Abfahrtsort ein.
                  </CardDescription>
                </div>
                <div className="flex items-center justify-center w-2/12">
                  <Button variant="outline" size="icon" onClick={swapLocations}>
                    <ArrowRightLeft />
                  </Button>
                </div>
                <div className="space-y-1  w-5/12">
                  <Label htmlFor="destination">Nach</Label>
                  <Input
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  <CardDescription className="pt-2">
                    Gib den Zielort ein.
                  </CardDescription>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <div className="lg:space-y-1  lg:w-4/12 w-5/12">
                  <Label htmlFor="datetime">Wann</Label>
                  <Input
                    id="datetime"
                    type="datetime-local"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                  />
                  <CardDescription className="pt-2">
                    Gib Datum und Uhrzeit ein.
                  </CardDescription>
                </div>
                <div className="space-y-1  w-4/12 content-center lg:mt-[-4px] mt-[-4px]">
                  <Tabs
                    defaultValue={activeSearchTab}
                    onValueChange={(value) => setActiveSearchTab(value)}
                  >
                    <TabsList className="lg:w-64">
                      <TabsTrigger
                        className="lg:w-32 w-[4.6rem]"
                        value="departure"
                      >
                        {resolvedTheme === "dark" ? (
                          activeSearchTab === "departure" ? (
                            <DarkActiveSmallCircle />
                          ) : (
                            <DarkInactiveSmallCircle />
                          )
                        ) : activeSearchTab === "departure" ? (
                          <LightActiveSmallCircle />
                        ) : (
                          <LightInactiveSmallCircle />
                        )}
                        <div className="lg:pl-2 pl-1">Abreise</div>
                      </TabsTrigger>
                      <TabsTrigger
                        className="lg:w-32 w-[4.6rem]"
                        value="arrival"
                      >
                        {resolvedTheme === "dark" ? (
                          activeSearchTab === "arrival" ? (
                            <DarkActiveSmallCircle />
                          ) : (
                            <DarkInactiveSmallCircle />
                          )
                        ) : activeSearchTab === "arrival" ? (
                          <LightActiveSmallCircle />
                        ) : (
                          <LightInactiveSmallCircle />
                        )}
                        <div className="lg:pl-2 pl-1">Ankunft</div>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="content-center lg:mt-[-4px] mt-[-6px]">
                  <Button id="submit" type="submit" className="lg:w-40">
                    Suche
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="recent-journeys">
        <CardRecentJourneys />
      </TabsContent>
    </Tabs>
  );
}

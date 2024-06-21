"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { useState } from "react";
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

/**
 * Component representing the journey planning card.
 * @returns {JSX.Element} JSX Element
 */
export function CardNewJourney() {
  // State variables
  const [activeSearchTab, setActiveSearchTab] = useState("departure");
  const [origin, setOrigin] = useState("Basel");
  const [destination, setDestination] = useState("Brugg");

  // Theme hook
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  /**
   * Function to swap origin and destination.
   */
  const swapLocations = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <Card>
      <CardHeader className="pb-8">
        <CardDescription className="text-zinc-600">
          Gib deine Reisedaten ein.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-12 pb-12">
        <div className="space-y-1">
          <div className="flex justify-between">
            <div className="w-5/12 space-y-1">
              <Label htmlFor="origin">Von</Label>
              <Input
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
              <CardDescription className="pt-2 text-zinc-600">
                Gib den Abfahrtsort ein.
              </CardDescription>
            </div>
            <div className="flex w-2/12 items-center justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapLocations}
                aria-label="Ort wechseln"
              >
                <ArrowRightLeft />
              </Button>
            </div>
            <div className="w-5/12 space-y-1">
              <Label htmlFor="destination">Nach</Label>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <CardDescription className="pt-2 text-zinc-600">
                Gib den Zielort ein.
              </CardDescription>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <div className="w-4/12 lg:w-4/12 lg:space-y-1">
              <Label htmlFor="datetime">Wann</Label>
              <DatePicker />
              <CardDescription className="pt-2 text-zinc-600">
                Gib Datum und Uhrzeit ein.
              </CardDescription>
            </div>
            <div className="mt-[-24px] w-3/12 content-center space-y-1 lg:mt-[-4px] lg:w-4/12">
              <Tabs
                defaultValue={activeSearchTab}
                onValueChange={(value) => setActiveSearchTab(value)}
              >
                <TabsList className="lg:w-64">
                  <TabsTrigger
                    className="w-[4.6rem] text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:w-32"
                    value="departure"
                  >
                    {resolvedTheme === "dark" ? (
                      activeSearchTab === "departure" ? (
                        <DarkActiveSmallCircle aria-hidden="true" />
                      ) : (
                        <DarkInactiveSmallCircle aria-hidden="true" />
                      )
                    ) : activeSearchTab === "departure" ? (
                      <LightActiveSmallCircle aria-hidden="true" />
                    ) : (
                      <LightInactiveSmallCircle aria-hidden="true" />
                    )}
                    <div className="pl-1 lg:pl-2">Abreise</div>
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-[4.6rem] text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:w-32"
                    value="arrival"
                  >
                    {resolvedTheme === "dark" ? (
                      activeSearchTab === "arrival" ? (
                        <DarkActiveSmallCircle aria-hidden="true" />
                      ) : (
                        <DarkInactiveSmallCircle aria-hidden="true" />
                      )
                    ) : activeSearchTab === "arrival" ? (
                      <LightActiveSmallCircle aria-hidden="true" />
                    ) : (
                      <LightInactiveSmallCircle aria-hidden="true" />
                    )}
                    <div className="pl-1 lg:pl-2">Ankunft</div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="mt-[-24px] content-center lg:mt-[-4px]">
              <Button
                id="submit"
                type="submit"
                className="lg:w-40"
                onClick={() => router.push("/select")}
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

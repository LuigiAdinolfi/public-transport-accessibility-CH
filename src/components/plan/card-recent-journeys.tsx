import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  LightTrainProfile,
  DarkTrainProfile,
} from "@/assets/icons/train-profile";
import { useTheme } from "next-themes";

/**
 * CardRecentJourneys component for selecting a recent journey.
 * @returns {React.ReactElement} CardRecentJourneys component.
 */
export function CardRecentJourneys(): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const fromLocation = "Basel SBB";
  const toLocation = "Brugg AG";
  const journeyDate = "Di, 07.05.2024";
  const journeyDuration = "46 min Reisezeit";
  const vehicleType = "Zug";
  const vehicleNumber = "IC6";

  return (
    <Card>
      <CardHeader className="pb-8">
        <CardDescription className="text-zinc-600 md:text-base">
          Eine frühere Reise auswählen.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 lg:pb-12">
        {/*<Card className="flex justify-between items-center min-h-48">*/}
        {/*  <CardDescription className="flex justify-center w-full text-base">*/}
        {/*    Keine früheren Reisen vorhanden.*/}
        {/*  </CardDescription>*/}
        {/*</Card>*/}
        <Button
          className="grid min-h-32 w-full items-center border-zinc-400 align-middle md:flex md:justify-between lg:min-h-32"
          variant="outline"
        >
          <div className="inline-flex h-full w-full items-center justify-start">
            {/* Journey Details Grid */}
            <div className="text-text/90 flex w-full items-center justify-between">
              {/* Left section */}
              <div className="grid w-full grid-flow-col grid-rows-2 justify-start gap-6 px-4">
                <div className="flex justify-start">
                  <div className="flex items-center px-1 text-lg font-semibold lg:text-xl">
                    {fromLocation}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-center px-1 md:text-base">
                    {journeyDate}
                  </div>
                </div>
              </div>

              {/* Middle section */}
              <div className="hidden w-full grid-flow-col grid-rows-2 justify-center gap-7 px-4 md:grid">
                <div className="flex justify-center">
                  <div className="mr-2 hidden items-center px-1 text-sm md:flex lg:text-base lg:font-medium">
                    {vehicleType}
                  </div>
                  <div className="text-lg:text-base hidden items-center px-1 md:flex lg:font-medium">
                    {resolvedTheme === "dark" ? (
                      <DarkTrainProfile className="h-6 w-6" />
                    ) : (
                      <LightTrainProfile className="h-6 w-6" />
                    )}
                  </div>
                  <div className="hidden items-center px-1 md:flex lg:text-base lg:font-medium">
                    {vehicleNumber}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="mr-2 hidden items-center px-1 text-sm md:flex lg:text-base lg:font-medium">
                    {vehicleType}
                  </div>
                  <div className="tlg:text-base hidden items-center px-1 md:flex lg:font-medium">
                    {resolvedTheme === "dark" ? (
                      <DarkTrainProfile className="h-8 w-8" />
                    ) : (
                      <LightTrainProfile className="h-8 w-8" />
                    )}
                  </div>
                  <div className="hidden items-center px-1 md:flex lg:text-base lg:font-medium">
                    {vehicleNumber}
                  </div>
                </div>
              </div>

              {/* Right section */}
              <div className="grid w-full grid-flow-col grid-rows-2 justify-end gap-6 px-4">
                <div className="flex justify-end">
                  <div className="flex items-center px-1 text-lg font-semibold lg:text-xl">
                    {toLocation}
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="flex items-center px-1 md:text-base">
                    {journeyDuration}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
}

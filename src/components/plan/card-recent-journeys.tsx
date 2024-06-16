import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { LightTrainProfile } from "@/assets/icons/light-train-profile";
import { useTheme } from "next-themes";
import { DarkTrainProfile } from "@/assets/icons/dark-train-profile";
import { DarkIr16, LightIr16 } from "@/assets/icons/ir-16";
import { DarkIc6, LightIc6 } from "@/assets/icons/ic-6";

export function CardRecentJourneys() {
  const { resolvedTheme } = useTheme();
  return (
    <Card>
      <CardHeader className="pb-8">
        <CardDescription className="text-zinc-600">
          Eine frühere Reise auswählen.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 pb-12">
        {/*<Card className="flex justify-between items-center min-h-48">*/}
        {/*  <CardDescription className="flex justify-center w-full text-base">*/}
        {/*    Keine früheren Reisen vorhanden.*/}
        {/*  </CardDescription>*/}
        {/*</Card>*/}
        <Button
          className="grid min-h-64 w-full items-center align-middle lg:flex lg:min-h-32 lg:justify-between"
          variant="outline"
        >
          <div className="inline-flex h-full w-full items-center justify-start">
            <div className="text-text/90 flex w-full items-center justify-between">
              <div className="grid w-full grid-flow-col grid-rows-2 justify-start gap-6 px-4">
                <div className="flex justify-start">
                  <div className="flex items-center px-1 text-2xl font-semibold">
                    Basel SBB
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-center px-1">Di, 07.05.2024</div>
                </div>
              </div>
              <div className="grid w-full grid-flow-col grid-rows-2 justify-center gap-7 px-4">
                <div className="flex justify-center">
                  <div className="mr-2 flex items-center px-1 text-base font-semibold">
                    Zug
                  </div>
                  <div className="flex items-center px-1 text-base font-normal">
                    {resolvedTheme === "dark" ? (
                      <DarkTrainProfile className="h-6 w-6" />
                    ) : (
                      <LightTrainProfile className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex items-center px-1 text-base font-normal">
                    {resolvedTheme === "dark" ? (
                      <DarkIc6 className="h-6 w-6" />
                    ) : (
                      <LightIc6 className="h-6 w-6" />
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="mr-2 flex items-center px-1 text-base font-semibold">
                    Zug
                  </div>
                  <div className="flex items-center px-1 text-base font-normal">
                    {resolvedTheme === "dark" ? (
                      <DarkTrainProfile className="h-8 w-8" />
                    ) : (
                      <LightTrainProfile className="h-8 w-8" />
                    )}
                  </div>
                  <div className="flex items-center px-1 text-base font-normal">
                    {resolvedTheme === "dark" ? (
                      <DarkIr16 className="h-6 w-6" />
                    ) : (
                      <LightIr16 className="h-6 w-6" />
                    )}
                  </div>
                </div>
              </div>
              <div className="grid w-full grid-flow-col grid-rows-2 justify-end gap-6 px-4">
                <div className="flex justify-end">
                  <div className="flex items-center px-1 text-2xl font-semibold">
                    Brugg AG
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="flex items-center px-1">46 min Reisezeit</div>
                </div>
              </div>
            </div>
          </div>
          {/*<CardRating />*/}
        </Button>
      </CardContent>
    </Card>
  );
}

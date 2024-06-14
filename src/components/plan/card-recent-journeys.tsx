import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { LightTrainProfile } from "@/assets/icons/light-train-profile";
import { DarkIc36, LightIc36 } from "@/assets/icons/ic-36";
import { useTheme } from "next-themes";
import { DarkTrainProfile } from "@/assets/icons/dark-train-profile";
import { CardRating } from "@/components/plan/card-rating";

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
          className="grid min-h-64 w-full items-center align-middle lg:flex lg:min-h-44 lg:justify-between"
          variant="outline"
        >
          <div className="inline-flex h-full w-full items-center justify-start">
            <div className="grid w-full grid-flow-col grid-rows-2 gap-10 px-4">
              <div className="text-text/90 flex w-full justify-between text-2xl font-semibold">
                <div>Basel SBB</div>
                <div className="flex justify-center">
                  <div className="flex items-center px-1 text-base font-semibold">
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
                      <DarkIc36 className="h-6 w-6" />
                    ) : (
                      <LightIc36 className="h-6 w-6" />
                    )}
                  </div>
                </div>
                <div>Brugg AG</div>
              </div>
              <div className="text-text/90 flex w-full justify-between text-sm">
                <div>Di, 07.05.2024</div>
                <div>46 min</div>
              </div>
            </div>
          </div>
          <CardRating />
        </Button>
      </CardContent>
    </Card>
  );
}

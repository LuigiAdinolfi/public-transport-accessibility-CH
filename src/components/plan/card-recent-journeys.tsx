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
        <CardDescription>Eine frühere Reise auswählen.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 pb-12">
        {/*<Card className="flex justify-between items-center min-h-48">*/}
        {/*  <CardDescription className="flex justify-center w-full text-base">*/}
        {/*    Keine früheren Reisen vorhanden.*/}
        {/*  </CardDescription>*/}
        {/*</Card>*/}
        <Button
          className="lg:flex grid lg:justify-between align-middle items-center lg:min-h-44 min-h-64 w-full"
          variant="outline"
        >
          <div className="w-full h-full inline-flex justify-start items-center ">
            <div className="grid grid-rows-2 grid-flow-col gap-10 w-full px-4">
              <div className="flex justify-between w-full text-2xl font-semibold text-text/90">
                <div>Basel SBB</div>
                <div className="flex justify-center">
                  <div className="flex items-center text-base font-semibold px-1">
                    Zug
                  </div>
                  <div className="flex items-center text-base font-normal px-1">
                    {resolvedTheme === "dark" ? (
                      <DarkTrainProfile className="h-6 w-6" />
                    ) : (
                      <LightTrainProfile className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex items-center text-base font-normal px-1">
                    {resolvedTheme === "dark" ? (
                      <DarkIc36 className="h-6 w-6" />
                    ) : (
                      <LightIc36 className="h-6 w-6" />
                    )}
                  </div>
                </div>
                <div>Brugg AG</div>
              </div>
              <div className="flex justify-between w-full text-sm text-text/90">
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

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
import { useRecentJourneysStore } from "@/store/useRecentJourneysStore";
import { handleFormSubmit } from "@/utils/submitUtils";
import { useJourneyStore } from "@/store/useJourneyStore";
import { useRouter } from "next/navigation";
import { formatDate, formatDateSmall } from "@/utils/dateUtils";
import { useMediaQuery } from "react-responsive";

/**
 * CardRecentJourneys component for selecting a recent journey.
 * @returns {React.ReactElement} CardRecentJourneys component.
 */
export function CardRecentJourneys(): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const recentJourneys = useRecentJourneysStore((state) =>
    state.getRecentJourneys(),
  );
  const { setTripDetails } = useJourneyStore();
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="pb-8">
        <CardDescription className="text-zinc-600 md:text-base">
          Eine frühere Reise auswählen.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 lg:pb-12">
        {recentJourneys.length === 0 ? (
          <Card className="flex min-h-48 items-center justify-center">
            <CardDescription className="flex w-full justify-center text-base">
              Keine früheren Reisen vorhanden.
            </CardDescription>
          </Card>
        ) : (
          recentJourneys.map((journey, index) => {
            const origin = journey.fromLocation?.locationName ?? "";
            const destination = journey.toLocation?.locationName ?? "";
            const date =
              journey.journeyDate instanceof Date
                ? journey.journeyDate.toISOString()
                : journey.journeyDate ?? "";
            const formattedDateBigScreen = formatDate(new Date(date));
            const formattedDateSmallScreen = formatDateSmall(new Date(date));
            return (
              <Button
                key={index}
                className="grid min-h-32 w-full items-center border-zinc-400 align-middle md:flex md:justify-between lg:min-h-32"
                variant="outline"
                onClick={() =>
                  handleFormSubmit(
                    journey.fromLocation,
                    journey.toLocation,
                    date,
                    "Dep",
                    setTripDetails,
                    router.push,
                  )
                }
              >
                <div className="inline-flex h-full w-full items-center justify-start">
                  <div className="text-text/90 flex w-full items-center justify-between">
                    <div className="grid w-full grid-flow-col grid-rows-2 justify-start gap-6 px-4">
                      <div className="flex justify-start">
                        <div className="flex items-center px-1 text-base font-semibold lg:text-xl">
                          {origin}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="flex items-center px-1 md:text-base">
                          {isMobile
                            ? formattedDateSmallScreen
                            : formattedDateBigScreen}
                        </div>
                      </div>
                    </div>
                    <div className="hidden w-full grid-flow-col grid-rows-2 justify-center gap-7 px-4 md:grid">
                      {journey.isMultipleConnection ? (
                        journey.connections.map((conn, connIndex) => (
                          <div key={connIndex} className="flex justify-center">
                            <div className="mr-2 items-center px-1 text-sm md:flex lg:text-base lg:font-medium">
                              {conn.vehicleType}
                            </div>
                            <div className="text-lg:text-base items-center px-1 md:flex lg:font-medium">
                              {resolvedTheme === "dark" ? (
                                <DarkTrainProfile className="h-6 w-6" />
                              ) : (
                                <LightTrainProfile className="h-6 w-6" />
                              )}
                            </div>
                            <div className="items-center px-1 md:flex lg:text-base lg:font-medium">
                              {conn.vehicleNumber}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex justify-center">
                          <div className="mr-2 items-center px-1 text-sm md:flex lg:text-base lg:font-medium">
                            {journey.vehicleType}
                          </div>
                          <div className="text-lg:text-base items-center px-1 md:flex lg:font-medium">
                            {resolvedTheme === "dark" ? (
                              <DarkTrainProfile className="h-6 w-6" />
                            ) : (
                              <LightTrainProfile className="h-6 w-6" />
                            )}
                          </div>
                          <div className="items-center px-1 md:flex lg:text-base lg:font-medium">
                            {journey.vehicleNumber}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="grid w-full grid-flow-col grid-rows-2 justify-end gap-6 px-4">
                      <div className="flex justify-end">
                        <div className="flex items-center px-1 text-base font-semibold lg:text-xl">
                          {destination}
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="flex items-center px-1 md:text-base">
                          {isMobile ? (
                            journey.journeyDuration.replace(/ Reisezeit/g, "")
                          ) : (
                            <>{journey.journeyDuration}</>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Button>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}

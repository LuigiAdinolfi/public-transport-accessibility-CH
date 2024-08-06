import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { formatDateSmall } from "@/utils/formatDateSmall";
import { getVehicleIcon } from "@/utils/handleVehicleIcon";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useMediaQuery } from "react-responsive";
import { useRecentJourneysStore } from "@/store/useRecentJourneysStore";
import { Label } from "@/components/ui/label";
import { Mic, Paperclip, SendHorizontal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AccountRating } from "@/components/account/account-rating";

/**
 * CardRating component displays recent journeys and allows users to add and edit comments on each journey.
 * It includes a form for inputting comments, and provides buttons to submit or edit comments.
 * The component supports responsive design and adjusts its layout based on the screen size.
 *
 * @returns {React.ReactElement} The rendered component.
 */
export function CardRating(): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const recentJourneys = useRecentJourneysStore((state) =>
    state.getRecentJourneys(),
  );

  // State to manage comment editing and input for each journey
  const [journeyStates, setJourneyStates] = useState(
    recentJourneys.map(() => ({
      isEditing: true,
      comment: "",
    })),
  );

  /**
   * Handles the submission of a comment for a specific journey.
   * Updates the state to show the comment instead of the input field.
   * @param {number} index - The index of the journey being updated.
   */
  const handleSubmitComment = (index: number) => {
    const updatedStates = [...journeyStates];
    updatedStates[index].isEditing = false;
    setJourneyStates(updatedStates);
  };

  /**
   * Handles switching from comment view to editing mode.
   * @param {number} index - The index of the journey being edited.
   */
  const handleEditComment = (index: number) => {
    const updatedStates = [...journeyStates];
    updatedStates[index].isEditing = true;
    setJourneyStates(updatedStates);
  };

  /**
   * Updates the comment text for a specific journey.
   * @param {number} index - The index of the journey being updated.
   * @param {string} value - The new comment text.
   */
  const handleCommentChange = (index: number, value: string) => {
    const updatedStates = [...journeyStates];
    updatedStates[index].comment = value;
    setJourneyStates(updatedStates);
  };

  return (
    <Card>
      {recentJourneys.length !== 0 && (
        <CardHeader className="pb-8">
          <CardDescription className="text-zinc-600 md:text-base">
            Bewerte deine letzten Reisen
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className="space-y-6">
        {recentJourneys.length === 0 ? (
          <div className="flex min-h-48 items-center justify-center">
            <CardDescription className="flex w-full justify-center text-base font-medium text-zinc-700 dark:text-zinc-200">
              Keine früheren Reisen vorhanden
            </CardDescription>
          </div>
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
            const VehicleIcon = getVehicleIcon(
              journey.vehicleType,
              resolvedTheme,
            );
            const { isEditing, comment } = journeyStates[index];
            return (
              <div
                key={index}
                className="grid min-h-72 w-full items-center justify-center whitespace-nowrap rounded-md border border-input border-zinc-800 bg-background bg-white align-middle text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-300 dark:bg-zinc-900 md:flex md:justify-between lg:min-h-32"
                onClick={() => {}}
              >
                <div className="flex w-full flex-col items-center justify-between px-8 py-8">
                  <div className="w-full flex-col items-center justify-center">
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
                            journey.connections.map((conn, connIndex) => {
                              const ConnectionIcon = getVehicleIcon(
                                conn.vehicleType,
                                resolvedTheme,
                              );
                              return (
                                <div
                                  key={connIndex}
                                  className="flex justify-center"
                                >
                                  <div className="mr-2 items-center px-1 text-sm md:flex lg:text-base lg:font-medium">
                                    {conn.vehicleType}
                                  </div>
                                  <div className="text-lg:text-base items-center px-1 md:flex lg:font-medium">
                                    {ConnectionIcon && (
                                      <ConnectionIcon className="h-6 w-6" />
                                    )}
                                  </div>
                                  <div className="items-center px-1 md:flex lg:text-base lg:font-medium">
                                    {conn.vehicleNumber}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="flex justify-center">
                              <div className="mr-2 items-center px-1 text-sm md:flex lg:text-base lg:font-medium">
                                {journey.vehicleType}
                              </div>
                              <div className="text-lg:text-base items-center px-1 md:flex lg:font-medium">
                                {VehicleIcon && (
                                  <VehicleIcon className="h-6 w-6" />
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
                                journey.journeyDuration.replace(
                                  / Reisezeit/g,
                                  "",
                                )
                              ) : (
                                <>{journey.journeyDuration}</>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-start pl-1">
                    <div
                      className={`flex w-full ${isMobile ? "justify-center" : "items-center justify-start pt-8"} p-4 text-base md:font-normal`}
                    >
                      {!isMobile && (
                        <div className="pr-3">Meine Bewertung:</div>
                      )}
                      <AccountRating />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-start px-4 pt-4">
                    {isEditing ? (
                      <div className="flex min-h-24 w-full overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                        <Label htmlFor={`message-${index}`} className="sr-only">
                          Kommentar
                        </Label>
                        <Textarea
                          id={`message-${index}`}
                          placeholder="Schreibe deinen Kommentar hier..."
                          className="min-h-12 resize-none border-0 p-3 text-base shadow-none focus-visible:ring-0"
                          value={comment}
                          onChange={(e) =>
                            handleCommentChange(index, e.target.value)
                          }
                        />
                        <div className="flex w-full items-center justify-end p-3">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Paperclip className="size-4" />
                                  <span className="sr-only">
                                    Datei anhängen
                                  </span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                Datei anhängen
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Mic className="size-4" />
                                  <span className="sr-only">
                                    Mikrofon benutzen
                                  </span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                Mikrofon benutzen
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <Button
                            type="button"
                            size="sm"
                            className="ml-8 gap-4 lg:h-11"
                            onClick={() => handleSubmitComment(index)}
                          >
                            <span className="md:text-base">
                              Kommentar abschicken
                            </span>
                            <SendHorizontal className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-between pl-1">
                        <p className="max-w-[38rem] overflow-auto text-base text-zinc-600">
                          {comment}
                        </p>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="lg:h-11"
                          onClick={() => handleEditComment(index)}
                        >
                          <span className="md:text-base">
                            Kommentar bearbeiten
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}

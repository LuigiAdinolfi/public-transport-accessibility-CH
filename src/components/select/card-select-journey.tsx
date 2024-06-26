"use client";

import { Card } from "@/components/ui/card";
import * as React from "react";
import { MultipleConnection } from "@/components/select/multiple-connection";
import { DirectConnection } from "@/components/select/direct-connection";
import { useJourneyStore } from "@/store/useJourneyStore";
import * as OJP from "ojp-sdk";
import { format } from "date-fns";
import { de } from "date-fns/locale";

/**
 * Component representing a card to select journey options.
 * @returns {JSX.Element} JSX Element
 */
export function CardSelectJourney() {
  const { tripDetails, selectedDate } = useJourneyStore();

  // Funzione per formattare la durata del viaggio
  const formatDuration = (duration: OJP.Duration | undefined): string => {
    if (!duration) return 'N/A';

    const totalMinutes = duration.totalMinutes ?? 0;
    const hours = duration.hours ?? Math.floor(totalMinutes / 60);
    const minutes = duration.minutes ?? totalMinutes % 60;

    if (hours > 0) {
      return `${hours} h ${minutes} min Reisezeit`;
    } else {
      return `${minutes} min Reisezeit`;
    }
  };

  return (
    <Card className="mt-3">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex w-full justify-start text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex w-full md:text-base justify-start text-zinc-600 dark:text-zinc-400">
            Wählen Sie eine dieser Optionen aus.
          </div>
          <div className="flex w-full md:text-base justify-end font-normal text-zinc-950 dark:text-zinc-400">
            {format(new Date(selectedDate), "EEE dd.MM.yyyy", { locale: de })}
          </div>
        </div>
      </div>
      <div className="space-y-6 p-6 pt-0">
        {tripDetails.map((trip, index) => {
          const legs = trip.legs;
          const totalDuration = trip.stats.duration;

          if (legs.length === 1) {
            return (
              <DirectConnection
                key={index}
                details={legs[0]}
                duration={formatDuration(totalDuration)}
              />
            );
          } else {
            const firstLeg = legs[0];
            const lastLeg = legs[legs.length - 1];
            return (
              <MultipleConnection
                key={index}
                firstLeg={firstLeg}
                lastLeg={lastLeg}
                duration={formatDuration(totalDuration)}
              />
            );
          }
        })}
      </div>
    </Card>
  );
}
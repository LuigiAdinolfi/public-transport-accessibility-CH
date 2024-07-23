"use client";

import React from "react";
import { useJourneyStore } from "@/store/useJourneyStore";
import { formatDate } from "@/utils/formatDate";
import { Button } from "@/components/ui/button";

/**
 * Component for displaying the header with journey options and the selected date.
 * @returns {React.ReactElement} The header component with journey options.
 */
export default function SelectOptionsHeader(): React.ReactElement {
  const { selectedDate } = useJourneyStore();

  return (
    <div className="w-full flex-col">
      <div className="flex w-full justify-start text-sm text-zinc-500 dark:text-zinc-400">
        <div className="flex w-full justify-start text-zinc-600 dark:text-zinc-400 md:text-base">
          Wählen Sie eine dieser Optionen aus.
        </div>
        <div className="flex w-full justify-end font-normal text-zinc-950 dark:text-zinc-400 md:text-base">
          {formatDate(selectedDate)}
        </div>
      </div>
      <div className="mt-6 flex w-full justify-center">
        <Button
          className="flex w-full text-base font-medium"
          variant="secondary"
          aria-label="Previous Connections"
          onClick={() => console.log("Previous Connections")}
        >
          Frühere Verbindungen
        </Button>
      </div>
    </div>
  );
}

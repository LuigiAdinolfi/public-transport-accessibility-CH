"use client";

import React from "react";
import { useJourneyStore } from "@/store/useJourneyStore";
import { formatDate } from "@/utils/formatDate";

/**
 * Component for displaying the header with journey options and the selected date.
 *
 * This component displays a header section with a message prompting the user to select
 * an option and shows the formatted selected date from the journey store.
 *
 * @returns {React.ReactElement} The rendered header component with journey options and selected date.
 */
export default function SelectOptionsHeader(): React.ReactElement {
  // Retrieve the selected date from the journey store
  const { selectedDate } = useJourneyStore();

  return (
    <div className="w-full flex-col">
      <div className="flex w-full justify-start text-sm text-zinc-500 dark:text-zinc-400">
        {/* Prompt text for selecting an option */}
        <div className="flex w-full justify-start text-zinc-600 dark:text-zinc-400 md:text-base">
          Wählen Sie eine dieser Optionen aus.
        </div>

        {/* Display the formatted selected date */}
        <div className="flex w-full justify-end font-normal text-zinc-950 dark:text-zinc-400 md:text-base">
          {formatDate(selectedDate)}
        </div>
      </div>
    </div>
  );
}

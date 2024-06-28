import React from "react";
import { formatDate, formatDateForUI } from "@/utils/dateUtils";
import { useJourneyStore } from "@/store/useJourneyStore";

/**
 * Component for displaying the header with journey options and the selected date.
 * @returns {React.ReactElement} The header component with journey options.
 */
export default function SelectOptionsHeader(): React.ReactElement {
  const { selectedDate } = useJourneyStore();

  return (
    <div className="flex w-full justify-start text-sm text-zinc-500 dark:text-zinc-400">
      <div className="flex w-full justify-start text-zinc-600 dark:text-zinc-400 md:text-base">
        Wählen Sie eine dieser Optionen aus.
      </div>
      <div className="flex w-full justify-end font-normal text-zinc-950 dark:text-zinc-400 md:text-base">
        {formatDateForUI(selectedDate)}
      </div>
    </div>
  );
}

import React from "react";
import { formatDate, formatDateSmall } from "@/utils/handleDate";
import { useJourneyStore } from "@/store/useJourneyStore";
import { useMediaQuery } from "react-responsive";

/**
 * Component for displaying the header with journey options and the selected date.
 * @returns {React.ReactElement} The header component with journey options.
 */
export default function SelectOptionsHeader(): React.ReactElement {
  const { selectedDate } = useJourneyStore();
  const bigDate = formatDate(selectedDate);
  const smallDate = formatDateSmall(selectedDate);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="flex w-full justify-start text-sm text-zinc-500 dark:text-zinc-400">
      <div className="flex w-full justify-start text-zinc-600 dark:text-zinc-400 md:text-base">
        Wählen Sie eine dieser Optionen aus.
      </div>
      <div className="flex w-full justify-end font-normal text-zinc-950 dark:text-zinc-400 md:text-base">
        {`${isMobile ? smallDate : bigDate}`}
      </div>
    </div>
  );
}

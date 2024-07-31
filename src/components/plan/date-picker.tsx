import * as React from "react";
import { useEffect } from "react";
import { toZonedTime, format } from "date-fns-tz";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { de } from "date-fns/locale";
import { useJourneyStore } from "@/store/useJourneyStore";
import { formatDateForUI } from "@/utils/formatDateForUI";
import { handleTimeChange } from "@/utils/handleTimeChange";

const timeZone = "Europe/Zurich";

/**
 * DatePicker component for selecting date and time.
 * Manages state for date and time selection.
 *
 * @returns {React.ReactElement} The rendered DatePicker component.
 */
export function DatePicker(): React.ReactElement {
  const { date, setDate, time, setTime } = useJourneyStore();
  const setSelectedDate = useJourneyStore((state) => state.setSelectedDate);

  // Initialize with current date and time
  useEffect(() => {
    const now = new Date();
    const zonedTime = toZonedTime(now, timeZone); // Convert current time to the specified time zone
    const formattedTime = format(zonedTime, "HH:mm"); // Format time to "HH:mm"
    setDate(zonedTime);
    setTime(formattedTime);
    setSelectedDate(zonedTime); // Update parent component with the initial date and time
  }, [setSelectedDate, setDate, setTime]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="h-11 w-full justify-between border border-zinc-800 bg-white text-left text-base font-normal dark:border-zinc-300 dark:bg-zinc-900 lg:w-80"
          aria-label={`Select Date and Time ${formatDateForUI(date)}`}
          suppressHydrationWarning
        >
          {date ? formatDateForUI(date) : ""}
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date} // Pass the currently selected date
          onSelect={(newDate) => {
            if (newDate) {
              // If a new date is selected, update the time portion
              const [hours, minutes] = time.split(":");
              newDate.setHours(parseInt(hours, 10));
              newDate.setMinutes(parseInt(minutes, 10));
              setDate(newDate);
              setSelectedDate(newDate); // Update parent component with the new date and time
            }
          }}
          initialFocus
          today={new Date()}
          locale={de} // Set locale to German
        />
        <div className="p-4">
          <label
            htmlFor="time"
            className="block pl-4 text-sm font-medium text-zinc-700"
          >
            Zeit
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={handleTimeChange} // Handle changes to the time input
            className="mt-1 block w-full rounded-md border border-zinc-300 py-2 pl-3 pr-3 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
            aria-label="Select time"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

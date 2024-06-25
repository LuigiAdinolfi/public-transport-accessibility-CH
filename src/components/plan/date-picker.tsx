import * as React from "react";
import { useState, useEffect } from "react";
import { toZonedTime, format } from "date-fns-tz";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { de } from "date-fns/locale";

const timeZone = "Europe/Zurich";

/**
 * DatePicker component allows selecting a date and time with timezone awareness.
 * @returns {JSX.Element} The DatePicker component UI
 */
export function DatePicker() {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("");

  // Initialize with current date and time
  useEffect(() => {
    const now = new Date();
    const zonedTime = toZonedTime(now, timeZone); // Convert to specified time zone
    const formattedTime = format(zonedTime, "HH:mm"); // Format time to HH:mm
    setDate(zonedTime);
    setTime(formattedTime);
  }, []);

  /**
   * Handles changes in the time input field.
   * Updates the date state with the new time.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event object
   */
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setTime(newTime);
    if (date) {
      const [hours, minutes] = newTime.split(":");
      const newDate = new Date(date);
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      setDate(newDate);
    }
  };

  /**
   * Formats the provided date into a localized string with date and time.
   * @param {Date | null} date - The date object to format
   * @returns {string} Formatted date string in "EEE dd. MMMM yyyy, HH:mm" format
   */
  const formatDateForUI = (date: Date | null) => {
    if (!date) return "";
    return format(date, "EEE dd. MMMM yyyy, HH:mm", { locale: de });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="text-base w-full justify-between text-left font-normal lg:w-[320px]"
          aria-label="Select Date and Time"
          suppressHydrationWarning
        >
          {date ? formatDateForUI(date) : ""}
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date} // Pass non-null value
          onSelect={(newDate) => {
            if (newDate) {
              const [hours, minutes] = time.split(":");
              newDate.setHours(parseInt(hours, 10));
              newDate.setMinutes(parseInt(minutes, 10));
              setDate(newDate);
            }
          }}
          initialFocus
          today={new Date()}
          locale={de}
        />
        <div className="p-4">
          <label
            htmlFor="time"
            className="block pl-4 text-sm font-medium text-gray-700"
          >
            Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={handleTimeChange}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-12 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            aria-label="Select time"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

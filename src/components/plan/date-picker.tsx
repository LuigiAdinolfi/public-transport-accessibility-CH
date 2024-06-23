"use client";

import * as React from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

const timeZone = "Europe/Zurich";

/**
 * Component for selecting a date and time using a calendar and time picker.
 * @returns {JSX.Element} JSX Element
 */
export function DatePicker() {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<string>("");

  // Initialize date and time on component mount
  useEffect(() => {
    const now = new Date();
    const zonedTime = toZonedTime(now, timeZone);
    const formattedTime = format(zonedTime, "HH:mm");
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
   * @param {Date} date - The date object to format
   * @returns {string} Formatted date string
   */
  const formatDate = (date: Date) => {
    return format(date, "EEE, PPP - HH:mm", { locale: de });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "md:text-lg w-full justify-between text-left font-normal lg:w-[320px]",
            !date && "text-muted-foreground"
          )}
          aria-label="Datum und Uhrzeit wählen"
          suppressHydrationWarning
        >
          {date ? formatDate(date) : formatDate(new Date())}
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
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
            Zeit
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

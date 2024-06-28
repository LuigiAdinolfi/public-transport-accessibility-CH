import { format } from "date-fns-tz";
import { de } from "date-fns/locale";
import { useJourneyStore } from "@/store/useJourneyStore";
import * as React from "react";

/**
 * Handles the change event when time input is modified.
 * Updates the time in the journey state and synchronizes with the date.
 * @param event - The change event from the input field.
 */
export const handleTimeChange = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const { date, setDate, setTime } = useJourneyStore.getState();
  const setSelectedDate = useJourneyStore.getState().setSelectedDate;
  const newTime = event.target.value;

  // Update local state with new time
  setTime(newTime);

  // If a date is selected, update it with the new time
  if (date) {
    const [hours, minutes] = newTime.split(":");
    const newDate = new Date(date);
    newDate.setHours(parseInt(hours, 10));
    newDate.setMinutes(parseInt(minutes, 10));
    setDate(newDate);
    setSelectedDate(newDate); // Update parent component with new date
  }
};

/**
 * Formats a date object for display in the UI with a specific format and locale.
 * @param date - The date object to format.
 * @returns A formatted date string suitable for display in the UI.
 */
export const formatDateForUI = (date: Date | null): string => {
  if (!date) return "";
  return format(date, "EEE dd. MMMM yyyy, HH:mm", { locale: de });
};

/**
 * Formats a date string for display in a specific format and locale.
 * @param date - The date string to format (should be in ISO format).
 * @returns A formatted date string suitable for display.
 */
export const formatDate = (date: string) => {
  return format(new Date(date), "EEE dd.MM.yyyy", { locale: de });
};

/**
 * Represents a duration of time in hours and minutes.
 */
export type Duration = {
  hours: number;
  minutes: number;
};

/**
 * Formats a duration object into a readable string representation.
 * @param duration - The duration object containing hours and minutes.
 * @returns A formatted string describing the duration (e.g., "2 h 30 min travel time").
 */
export const formatDuration = (duration: Duration) => {
  const { hours, minutes } = duration;
  if (hours > 0) {
    return `${hours} h ${minutes} min Reisezeit`;
  } else {
    return `${minutes} min Reisezeit`;
  }
};

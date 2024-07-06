import * as React from "react";
import { useJourneyStore } from "@/store/useJourneyStore";

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

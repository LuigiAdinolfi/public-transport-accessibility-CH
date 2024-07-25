import * as React from "react";
import { useJourneyStore } from "@/store/useJourneyStore";

/**
 * Handles the change event for a time input field.
 *
 * This function is triggered when the time input is modified by the user.
 * It updates the time in the journey state and, if a date is already selected,
 * synchronizes the date with the new time.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the time input field.
 * Contains the new time value entered by the user in the format "HH:MM".
 */
export const handleTimeChange = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  // Get the current state and setter functions from the journey store
  const { date, setDate, setTime } = useJourneyStore.getState();
  const setSelectedDate = useJourneyStore.getState().setSelectedDate;

  // Extract the new time from the input event
  const newTime = event.target.value;

  // Update the journey store with the new time
  setTime(newTime);

  // Check if a date is selected and synchronize it with the new time
  if (date) {
    // Split the time into hours and minutes
    const [hours, minutes] = newTime.split(":");

    // Create a new Date object based on the current date and update the time
    const newDate = new Date(date);
    newDate.setHours(parseInt(hours, 10));
    newDate.setMinutes(parseInt(minutes, 10));

    // Update the journey store with the new date and time
    setDate(newDate);
    setSelectedDate(newDate); // Update the parent component or other parts of the application
  }
};

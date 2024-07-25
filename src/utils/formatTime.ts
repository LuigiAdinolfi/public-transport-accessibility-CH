/**
 * Formats a Date object to a string representation of time in the format HH:mm.
 * Returns 'N/A' if the input date is null, undefined, or invalid.
 *
 * @param {Date | null | undefined} date - The Date object to format.
 *                                           Can be null, undefined, or an invalid date.
 * @returns {string} - The formatted time string (HH:mm) or 'N/A' if the date is null, undefined, or invalid.
 */
export function formatTime(date: Date | null | undefined): string {
  // Return "N/A" if the date is null, undefined, or invalid
  if (!date) return "N/A";

  // Create a new Date object from the input date
  const validDate = new Date(date);

  // Check if the created Date object is valid
  if (isNaN(validDate.getTime())) return "N/A";

  // Format the Date object to a time string (HH:mm)
  return validDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

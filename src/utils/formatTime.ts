/**
 * Formats a Date object to a string representation of time (HH:mm).
 * Returns 'N/A' if the input date is null or undefined or invalid.
 * @param {Date | null | undefined} date - The Date object to format.
 * @returns {string} - The formatted time string (HH:mm) or 'N/A' if date is null or undefined or invalid.
 */
export function formatTime(date: Date | null | undefined): string {
  if (!date) return "N/A";
  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) return "N/A";
  return validDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

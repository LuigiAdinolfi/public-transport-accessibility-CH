/**
 * Formats a Date object to a string representation of time (HH:mm).
 * Returns 'N/A' if the input date is null or undefined.
 * @param {Date | null | undefined} date - The Date object to format.
 * @returns {string} - The formatted time string (HH:mm) or 'N/A' if date is null or undefined.
 */
export function formatTime(date: Date | null): string {
  if (!date) return "N/A";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

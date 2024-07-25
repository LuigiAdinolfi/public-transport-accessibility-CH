import { format } from "date-fns-tz";
import { de } from "date-fns/locale";

/**
 * Formats a date object for display in the UI with a specific format and locale.
 *
 * @param {Date | null} date - The date object to format. If `null`, an empty string is returned.
 * @returns {string} A formatted date string suitable for display in the UI.
 *                    Returns an empty string if the input date is `null`.
 */
export const formatDateForUI = (date: Date | null): string => {
  // Return an empty string if the input date is null
  if (!date) return "";

  // Format the date to a string with the format "EEE dd. MMMM yyyy, HH:mm"
  return format(date, "EEE dd. MMMM yyyy, HH:mm", { locale: de });
};

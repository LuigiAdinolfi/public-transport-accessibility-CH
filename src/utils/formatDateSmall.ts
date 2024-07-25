import { format } from "date-fns-tz";
import { de } from "date-fns/locale";

/**
 * Formats a date object for small display using a specific format and locale.
 *
 * @param {Date | null} date - The date object to format. If `null`, an empty string is returned.
 * @returns {string} A formatted date string suitable for small display.
 *                    Returns an empty string if the input date is `null`.
 */
export const formatDateSmall = (date: Date | null): string => {
  // Check if the date is null and return an empty string if it is
  if (!date) return "";

  // Format the date to a string with the format "EEE dd. MMMM yyyy"
  return format(date, "EEE dd. MMMM yyyy", { locale: de });
};

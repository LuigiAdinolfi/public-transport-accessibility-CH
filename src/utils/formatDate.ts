import { format } from "date-fns-tz";
import { de } from "date-fns/locale";

/**
 * Formats a date for display in a specific format and locale.
 *
 * @param {Date | null} date - The date to format. If `null`, an empty string is returned.
 * @returns {string} A formatted date string suitable for display.
 *                    Returns an empty string if the input date is `null`.
 */
export const formatDate = (date: Date | null): string => {
  if (!date) return "";
  return format(new Date(date), "EEEE dd. MMMM yyyy", { locale: de });
};

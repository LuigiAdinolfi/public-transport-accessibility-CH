import { format } from "date-fns-tz";
import { de } from "date-fns/locale";

/**
 * Formats a date string for display in a specific format and locale.
 * @param date - The date string to format (should be in ISO format).
 * @returns A formatted date string suitable for small display.
 */
export const formatDateSmall = (date: Date | null): string => {
  if (!date) return "";
  return format(new Date(date), "EEE dd. MMMM yyyy", { locale: de });
};

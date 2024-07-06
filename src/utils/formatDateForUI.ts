import { format } from "date-fns-tz";
import { de } from "date-fns/locale";

/**
 * Formats a date object for display in the UI with a specific format and locale.
 * @param date - The date object to format.
 * @returns A formatted date string suitable for display in the UI.
 */
export const formatDateForUI = (date: Date | null): string => {
  if (!date) return "";
  return format(date, "EEE dd. MMMM yyyy, HH:mm", { locale: de });
};

/**
 * Truncates a string to 40 characters.
 * Returns 'N/A' if the input string is null or undefined.
 * @param {string} value - The string to truncate.
 * @returns {string} - The truncated string or 'N/A' if value is null or undefined.
 */
export const truncateTo40Chars = (value: string): string => {
  return value && value.length > 40
    ? `${value.substring(0, 40)}`
    : value || "N/A";
};

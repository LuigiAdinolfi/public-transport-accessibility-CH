/**
 * Truncates a string to a maximum of 40 characters.
 *
 * If the input string is longer than 40 characters, it will be truncated to the first 40 characters.
 * If the input string is null or undefined, the function returns 'N/A'.
 *
 * @param {string} value - The string to truncate. If this is null or undefined, 'N/A' will be returned.
 * @returns {string} - The truncated string if it exceeds 40 characters, or the original string if it is 40 characters or fewer.
 * Returns "N/A" if the input string is null or undefined.
 */
export const truncateTo40Chars = (value: string): string => {
  // Check if the value is not null or undefined and its length exceeds 40 characters
  return value && value.length > 40
    ? `${value.substring(0, 40)}` // Return the first 40 characters of the string
    : value || "N/A"; // Return the original string or "N/A" if the string is null or undefined
};

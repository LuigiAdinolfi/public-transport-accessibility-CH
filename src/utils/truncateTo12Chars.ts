/**
 * Truncates a string to a maximum of 12 characters.
 *
 * If the input string is longer than 12 characters, it will be truncated to the first 12 characters.
 * If the input string is null or undefined, the function returns 'N/A'.
 *
 * @param {string} value - The string to truncate. If this is null or undefined, 'N/A' will be returned.
 * @returns {string} - The truncated string if it exceeds 12 characters, or the original string if it is 12 characters or fewer.
 * Returns "N/A" if the input string is null or undefined.
 */
export const truncateTo12Chars = (value: string): string => {
  // Check if the value is not null or undefined and its length exceeds 12 characters
  return value && value.length > 12
    ? `${value.substring(0, 12)}` // Return the first 12 characters of the string
    : value || "N/A"; // Return the original string or "N/A" if the string is null or undefined
};

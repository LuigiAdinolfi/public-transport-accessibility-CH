import { truncateTo12Chars } from "@/utils/truncateTo12Chars";
import { truncateTo20Chars } from "@/utils/truncateTo20Chars";

/**
 * Formats the location name based on the number of transfer legs.
 *
 * This function adjusts the length of the location name depending on the number of transfer legs.
 * If the number of transfer legs is greater than 2, the name is truncated to 12 characters.
 * If there are exactly 2 transfer legs, the name is truncated to 20 characters.
 * Otherwise, the full location name is returned.
 *
 * @param {string | null | undefined} fromLocationName - The location name to format. Can be null or undefined.
 * @param {number} transferLegsLength - The number of transfer legs to determine the truncation rule.
 * @returns {string} - The formatted location name, truncated based on the number of transfer legs or the original name if no truncation is required.
 */
export const handleLocation = (
  fromLocationName: string | null | undefined,
  transferLegsLength: number,
): string => {
  // Default to "N/A" if the location name is null or undefined
  const defaultLocationName = fromLocationName ?? "N/A";

  // Truncate the name based on the number of transfer legs
  if (transferLegsLength > 2) {
    // If more than 2 transfer legs, truncate to 12 characters
    return truncateTo12Chars(defaultLocationName);
  } else if (transferLegsLength === 2) {
    // If exactly 2 transfer legs, truncate to 20 characters
    return truncateTo20Chars(defaultLocationName);
  } else {
    // If 0 or 1 transfer leg, return the full location name
    return defaultLocationName;
  }
};

import { truncateTo12Chars } from "@/utils/truncateTo12Chars";
import { truncateTo20Chars } from "@/utils/truncateTo20Chars";

/**
 * Handles the location name based on the number of transfer legs.
 * @param {string | null | undefined} fromLocationName - The location name to handle.
 * @param {number} transferLegsLength - The length of the transfer legs.
 * @returns {string} - The formatted location name.
 */
export const handleLocation = (
  fromLocationName: string | null | undefined,
  transferLegsLength: number,
): string => {
  const defaultLocationName = fromLocationName ?? "N/A";

  if (transferLegsLength > 2) {
    return truncateTo12Chars(defaultLocationName);
  } else if (transferLegsLength === 2) {
    return truncateTo20Chars(defaultLocationName);
  } else {
    return defaultLocationName;
  }
};

import { useCallback } from "react";

/**
 * Custom hook to handle mouse enter events for highlighting options in a list or menu.
 * This hook provides a function that updates the highlighted index when a user hovers over an option.
 *
 * @param {(index: number) => void} setHighlightedIndex - Setter function to update the highlighted index.
 * @returns {(index: number) => void} A function to handle mouse enter events by setting the highlighted index.
 */
export const useHandleMouseEnter = (
  setHighlightedIndex: (index: number) => void,
) => {
  return useCallback(
    (index: number) => {
      setHighlightedIndex(index); // Update the highlighted index based on mouse enter event
    },
    [setHighlightedIndex], // Dependency array to ensure the function updates when `setHighlightedIndex` changes
  );
};

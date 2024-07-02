import { useCallback } from "react";

/**
 * Custom hook to handle mouse enter events for highlighting options.
 * @param {function} setHighlightedIndex - Setter function for highlighted index.
 * @returns a function to handle mouse enter events on options.
 */
export const useHandleMouseEnter = (
  setHighlightedIndex: (index: number) => void,
) => {
  return useCallback((index: number) => {
    setHighlightedIndex(index);
  }, []);
};

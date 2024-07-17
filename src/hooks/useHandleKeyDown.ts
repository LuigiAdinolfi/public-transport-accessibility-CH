import * as OJP from "ojp-sdk";
import { KeyboardEvent, useCallback } from "react";

/**
 * Custom hook to handle keyboard events for option selection.
 * @param {boolean} menuOpen - Indicates whether the menu of options is open.
 * @param {OJP.Location[]} options - Array of available location options.
 * @param {number | null} highlightedIndex - Index of the currently highlighted option.
 * @param {function} setHighlightedIndex - Setter function for highlighted index.
 * @param {function} handleOptionSelect - Function to handle selection of an option.
 * @param setMenuOpen - Add setMenuOpen as a parameter
 * @returns a function to handle keydown events.
 */
export const useHandleKeyDown = (
  menuOpen: boolean,
  options: OJP.Location[],
  highlightedIndex: number | null,
  setHighlightedIndex: (index: number | null) => void,
  handleOptionSelect: (option: OJP.Location) => void,
  setMenuOpen: (open: boolean) => void, // Add setMenuOpen as a parameter
) => {
  return useCallback(
    (event: KeyboardEvent) => {
      if (!menuOpen || !options.length) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const nextIndex =
          highlightedIndex === null || highlightedIndex === options.length - 1
            ? 0
            : highlightedIndex + 1;
        setHighlightedIndex(nextIndex);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const nextIndex =
          highlightedIndex === null || highlightedIndex === 0
            ? options.length - 1
            : highlightedIndex - 1;
        setHighlightedIndex(nextIndex);
      } else if (event.key === "Enter" || event.key === "Tab") {
        // Handle Tab key as well
        if (highlightedIndex !== null) {
          handleOptionSelect(options[highlightedIndex]);
        }
        setMenuOpen(false); // Close the menu when an option is selected
      }
    },
    [
      menuOpen,
      options,
      highlightedIndex,
      setHighlightedIndex,
      handleOptionSelect,
      setMenuOpen,
    ],
  );
};

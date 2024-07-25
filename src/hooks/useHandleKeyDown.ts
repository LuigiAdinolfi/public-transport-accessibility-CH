import * as OJP from "ojp-sdk";
import { KeyboardEvent, useCallback } from "react";

/**
 * Custom hook to handle keyboard events for selecting options from a menu.
 * This hook manages keyboard interactions such as navigating through options with arrow keys
 * and selecting an option with the Enter or Tab key. It also manages menu visibility based on the selected option.
 *
 * @param {boolean} menuOpen - Indicates whether the menu of options is open.
 * @param {OJP.Location[]} options - Array of available location options.
 * @param {number | null} highlightedIndex - Index of the currently highlighted option in the menu.
 * @param {(index: number | null) => void} setHighlightedIndex - Setter function to update the highlighted index.
 * @param {(option: OJP.Location) => void} handleOptionSelect - Function to handle the selection of an option.
 * @param {(open: boolean) => void} setMenuOpen - Setter function to update the menu open state.
 * @returns {(event: KeyboardEvent) => void} A function that handles keydown events for keyboard navigation and selection.
 */
export const useHandleKeyDown = (
  menuOpen: boolean,
  options: OJP.Location[],
  highlightedIndex: number | null,
  setHighlightedIndex: (index: number | null) => void,
  handleOptionSelect: (option: OJP.Location) => void,
  setMenuOpen: (open: boolean) => void,
) => {
  return useCallback(
    (event: KeyboardEvent) => {
      // Exit early if the menu is closed or there are no options
      if (!menuOpen || !options.length) return;

      // Handle "ArrowDown" key to navigate to the next option
      if (event.key === "ArrowDown") {
        event.preventDefault(); // Prevent default scrolling behavior
        const nextIndex =
          highlightedIndex === null || highlightedIndex === options.length - 1
            ? 0
            : highlightedIndex + 1;
        setHighlightedIndex(nextIndex);
      }
      // Handle "ArrowUp" key to navigate to the previous option
      else if (event.key === "ArrowUp") {
        event.preventDefault(); // Prevent default scrolling behavior
        const nextIndex =
          highlightedIndex === null || highlightedIndex === 0
            ? options.length - 1
            : highlightedIndex - 1;
        setHighlightedIndex(nextIndex);
      }
      // Handle "Enter" or "Tab" key to select the highlighted option
      else if (event.key === "Enter" || event.key === "Tab") {
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

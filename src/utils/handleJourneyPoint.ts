import { useState, useEffect, useCallback, KeyboardEvent } from "react";
import * as OJP from "ojp-sdk";
import {
  fetchJourneyPoints,
  MapLocations,
} from "@/api/openJourneyPlanner/fetch-journey-points";

/**
 * Custom hook to fetch location options based on user input.
 * @param {string} inputValue - The current input value from the user.
 * @param {OJP.Location | null} selectedOption - The currently selected location option.
 * @returns an object containing the fetched options, menu open state, and setter function.
 */
export const useFetchOptions = (
  inputValue: string,
  selectedOption: OJP.Location | null,
) => {
  const [options, setOptions] = useState<OJP.Location[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (inputValue.length > 1 && inputValue !== selectedOption?.locationName) {
      fetchJourneyPoints(inputValue).then((locations: MapLocations) => {
        const allLocations: OJP.Location[] = [
          ...locations.stop,
          // ...locations.address,
          // ...locations.poi,
          // ...locations.topographicPlace,
        ];
        setOptions(allLocations);
        setMenuOpen(true);
      });
    } else {
      setOptions([]);
      setMenuOpen(false);
    }
  }, [inputValue, selectedOption?.locationName]);

  return { options, menuOpen, setMenuOpen };
};

/**
 * Custom hook to handle selection of location options.
 * @param {function} onLocationSelected - Callback function invoked when a location is selected.
 * @returns an object containing current input value, selected option, and handler function.
 */
export const useHandleOptionSelect = (
  onLocationSelected: (option: OJP.Location) => void,
) => {
  const [selectedOption, setSelectedOption] = useState<OJP.Location | null>(
    null,
  );
  const [inputValue, setInputValue] = useState<string>("");

  /**
   * Handles selection of a location option.
   * @param {OJP.Location} option - The selected location option.
   */
  const handleOptionSelect = useCallback(
    (option: OJP.Location) => {
      setInputValue(option.locationName ?? "");
      setSelectedOption(option);
      onLocationSelected(option);
    },
    [onLocationSelected],
  );

  return { inputValue, setInputValue, selectedOption, handleOptionSelect };
};

/**
 * Custom hook to handle keyboard events for option selection.
 * @param {boolean} menuOpen - Indicates whether the menu of options is open.
 * @param {OJP.Location[]} options - Array of available location options.
 * @param {number | null} highlightedIndex - Index of the currently highlighted option.
 * @param {function} setHighlightedIndex - Setter function for highlighted index.
 * @param {function} handleOptionSelect - Function to handle selection of an option.
 * @returns a function to handle keydown events.
 */
export const useHandleKeyDown = (
  menuOpen: boolean,
  options: OJP.Location[],
  highlightedIndex: number | null,
  setHighlightedIndex: (index: number | null) => void,
  handleOptionSelect: (option: OJP.Location) => void,
) => {
  return useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
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
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (highlightedIndex !== null) {
          handleOptionSelect(options[highlightedIndex]);
        }
      }
    },
    [menuOpen, options, highlightedIndex, handleOptionSelect],
  );
};

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

import { useState, useCallback } from "react";
import * as OJP from "ojp-sdk";

/**
 * Custom hook to manage the selection of location options and handle related state updates.
 *
 * This hook provides a way to select a location from a list of options, update the input value, and close the menu.
 *
 * @param {(option: OJP.Location) => void} onLocationSelected - Callback function invoked when a location is selected.
 * @param {(open: boolean) => void} setMenuOpen - Function to set the menu's open state.
 * @returns {{
 *   inputValue: string,
 *   setInputValue: React.Dispatch<React.SetStateAction<string>>,
 *   selectedOption: OJP.Location | null,
 *   handleOptionSelect: (option: OJP.Location) => void
 * }} An object containing:
 * - `inputValue`: The current value of the input field.
 * - `setInputValue`: Setter function to update the input field value.
 * - `selectedOption`: The currently selected location option, or `null` if none is selected.
 * - `handleOptionSelect`: Function to handle the selection of a location option.
 */
export const useHandleOptionSelect = (
  onLocationSelected: (option: OJP.Location) => void,
  setMenuOpen: (open: boolean) => void,
) => {
  const [selectedOption, setSelectedOption] = useState<OJP.Location | null>(
    null,
  );
  const [inputValue, setInputValue] = useState<string>("");

  /**
   * Handles the selection of a location option.
   * Updates the input value with the selected location's name, sets the selected option state,
   * invokes the callback with the selected option, and closes the menu.
   *
   * @param {OJP.Location} option - The selected location option.
   */
  const handleOptionSelect = useCallback(
    (option: OJP.Location) => {
      setInputValue(option.locationName ?? ""); // Update input value with the selected location's name
      setSelectedOption(option); // Set the selected option state
      onLocationSelected(option); // Invoke the callback with the selected option
      setMenuOpen(false); // Close the menu after selection
    },
    [onLocationSelected, setMenuOpen],
  );

  return { inputValue, setInputValue, selectedOption, handleOptionSelect };
};

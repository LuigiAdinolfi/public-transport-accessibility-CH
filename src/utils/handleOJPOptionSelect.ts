import { useState, useCallback } from "react";
import * as OJP from "ojp-sdk";

/**
 * Custom hook to handle selection of location options.
 * @param {function} onLocationSelected - Callback function invoked when a location is selected.
 * @returns an object containing current input value, selected option, and handler function.
 */
export const handleOJPOptionSelect = (
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

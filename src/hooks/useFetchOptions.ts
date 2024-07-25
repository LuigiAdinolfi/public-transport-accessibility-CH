import { useState, useEffect } from "react";
import * as OJP from "ojp-sdk";
import {
  fetchJourneyPoints,
  MapLocations,
} from "@/services/openJourneyPlanner/fetch-journey-points";

/**
 * Custom hook to fetch location options based on user input.
 * This hook is used to fetch and manage location options from the Open Journey Planner API.
 * It handles updating the list of options based on user input and manages the state of the menu.
 *
 * @param {string} inputValue - The current input value from the user. This is used to query location options.
 * @param {OJP.Location | null} selectedOption - The currently selected location option. Used to avoid refetching the same location.
 * @returns {object} An object containing:
 *   - {OJP.Location[]} options - The list of fetched location options.
 *   - {boolean} menuOpen - The state indicating whether the options menu is open.
 *   - {Function} setMenuOpen - A function to set the state of the menu open/closed.
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
        // Combine all fetched locations into a single array.
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
      // Clear options and close the menu if input is empty or matches the selected option.
      setOptions([]);
      setMenuOpen(false);
    }
  }, [inputValue, selectedOption?.locationName]);

  return { options, menuOpen, setMenuOpen };
};

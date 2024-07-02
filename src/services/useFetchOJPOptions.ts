import * as OJP from "ojp-sdk";
import { useEffect, useState } from "react";
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
export const useFetchOJPOptions = (
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

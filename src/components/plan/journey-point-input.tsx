import React, { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchJourneyPoints, MapLocations } from "@/api/openJourneyPlanner/fetch-journey-points";
import * as OJP from "ojp-sdk";

interface Props {
  /**
   * Placeholder text for the input field.
   */
  placeholder: string;
  /**
   * Callback function invoked when a location is selected.
   * @param {OJP.Location} location - The selected location object.
   */
  onLocationSelected: (location: OJP.Location) => void;
  /**
   * Description text displayed below the input field.
   */
  description: string;
  /**
   * Current value of the input field.
   */
  value: string;
}

/**
 * JourneyPointInput component for selecting a journey point using autocomplete.
 * @param {Props} props - The props object containing placeholder, onLocationSelected, description, and value.
 * @returns {JSX.Element} The JourneyPointInput component UI.
 */
const JourneyPointInput: React.FC<Props> = ({ placeholder, onLocationSelected, description, value }) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [options, setOptions] = useState<OJP.Location[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OJP.Location | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.length > 1 && inputValue !== selectedOption?.locationName) {
      fetchJourneyPoints(inputValue).then((locations: MapLocations) => {
        const allLocations: OJP.Location[] = [
          ...locations.stop,
          ...locations.address,
          ...locations.poi,
          ...locations.topographicPlace
        ];
        setOptions(allLocations);
        setMenuOpen(true);
        setHighlightedIndex(null);
      });
    } else {
      setOptions([]);
      setMenuOpen(false);
    }
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  /**
   * Handles selecting an option from the autocomplete menu.
   * Updates the input value, selected option, and invokes the onLocationSelected callback.
   * @param {OJP.Location} option - The selected location option.
   */
  const handleOptionSelect = useCallback((option: OJP.Location) => {
    setInputValue(option.locationName ?? "");
    setSelectedOption(option);
    onLocationSelected(option);
    setMenuOpen(false);
    setHighlightedIndex(null);
  }, [onLocationSelected]);

  /**
   * Handles keyboard events for navigating the autocomplete menu.
   * Allows arrow key navigation and Enter key selection.
   * @param {KeyboardEvent<HTMLInputElement>} event - The keyboard event object.
   */
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (!menuOpen || !options.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = (highlightedIndex === null || highlightedIndex === options.length - 1) ? 0 : highlightedIndex + 1;
      setHighlightedIndex(nextIndex);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = (highlightedIndex === null || highlightedIndex === 0) ? options.length - 1 : highlightedIndex - 1;
      setHighlightedIndex(nextIndex);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (highlightedIndex !== null) {
        handleOptionSelect(options[highlightedIndex]);
      }
    }
  }, [menuOpen, options, highlightedIndex, handleOptionSelect]);

  /**
   * Handles mouse enter event on a menu option.
   * Updates the highlighted index to show visual focus.
   * @param {number} index - The index of the option being hovered.
   */
  const handleMouseEnter = useCallback((index: number) => {
    setHighlightedIndex(index);
  }, []);

  return (
    <div className="w-full lg:w-5/12 space-y-1">
      <Label htmlFor={placeholder} className="md:text-base">{placeholder}</Label>
      <div style={{ position: "relative" }}>
        <Input
          id={placeholder}
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setMenuOpen(true)}
          onKeyDown={handleKeyDown}
          className="text-base"
        />
        {menuOpen && options.length > 0 && (
          <div
            ref={menuRef}
            className="absolute top-full left-0 z-10 w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 border border-gray-300 border-t-0 rounded-b-md"
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`p-2 cursor-pointer ${highlightedIndex === index ? "bg-gray-200 dark:text-zinc-50 dark:bg-zinc-700" : ""}`}
              >
                {option.locationName}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="pt-2 dark:text-zinc-400 text-zinc-600 md:text-base">
        {description}
      </div>
    </div>
  );
};

export default JourneyPointInput;

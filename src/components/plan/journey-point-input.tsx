import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JourneyPointProps } from "@/helpers/journeyPointProps";
import { useHandleOptionSelect } from "@/hooks/useHandleOptionSelect";
import { useFetchOptions } from "@/hooks/useFetchOptions";
import { useHandleKeyDown } from "@/hooks/useHandleKeyDown";
import { useHandleMouseEnter } from "@/hooks/useHandleMouseEnter";

/**
 * Component for input field with location search and selection functionality.
 *
 * @param {JourneyPointProps} props - Props object containing placeholder, onLocationSelected callback,
 * description, and value.
 * @returns {React.ReactElement} JSX element representing the JourneyPointInput component.
 */
export default function JourneyPointInput({
  placeholder,
  onLocationSelected,
  description,
  value,
}: JourneyPointProps): React.ReactElement {
  const { inputValue, setInputValue, selectedOption, handleOptionSelect } =
    useHandleOptionSelect(onLocationSelected);
  const { options, menuOpen, setMenuOpen } = useFetchOptions(
    inputValue,
    selectedOption,
  );
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const handleKeyDown = useHandleKeyDown(
    menuOpen,
    options,
    highlightedIndex,
    setHighlightedIndex,
    handleOptionSelect,
  );
  const handleMouseEnter = useHandleMouseEnter(setHighlightedIndex);

  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value, setInputValue]);

  return (
    <div className="w-full space-y-1 lg:w-96">
      <Label htmlFor={placeholder} className="md:text-base">
        {placeholder}
      </Label>
      <div style={{ position: "relative" }}>
        <Input
          id={placeholder}
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setMenuOpen(true)}
          onKeyDown={handleKeyDown}
          className="text-base"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded={menuOpen}
        />
        {menuOpen && options.length > 0 && (
          <div
            ref={menuRef}
            className="absolute left-0 top-full z-10 w-full rounded-b-md border border-t-0 border-gray-300 bg-zinc-50 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50"
            role="listbox"
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`cursor-pointer p-2 ${highlightedIndex === index ? "bg-gray-200 dark:bg-zinc-700 dark:text-zinc-50" : ""}`}
                role="option"
                aria-selected={highlightedIndex === index}
              >
                {option.locationName}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="pt-2 text-zinc-600 dark:text-zinc-400 md:text-base">
        {description}
      </div>
    </div>
  );
}

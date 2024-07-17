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
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { inputValue, setInputValue, selectedOption, handleOptionSelect } =
    useHandleOptionSelect(onLocationSelected, setMenuOpen);
  const { options } = useFetchOptions(inputValue, selectedOption);

  const handleKeyDown = useHandleKeyDown(
    menuOpen,
    options,
    highlightedIndex,
    setHighlightedIndex,
    handleOptionSelect,
    setMenuOpen, // Pass setMenuOpen to useHandleKeyDown
  );
  const handleMouseEnter = useHandleMouseEnter(setHighlightedIndex);

  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value, setInputValue]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [setMenuOpen]);

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
          className="border border-zinc-800 bg-white text-base dark:border-zinc-300 dark:bg-zinc-900"
          aria-autocomplete="list"
          aria-haspopup="listbox"
        />
        {menuOpen && options.length > 0 && (
          <div
            ref={menuRef}
            className="absolute left-0 top-full z-10 w-full rounded-b-md border border-t-0 border-zinc-300 bg-zinc-50 text-zinc-950 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
            role="listbox"
            aria-labelledby={placeholder}
            aria-label={placeholder}
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`cursor-pointer p-2 ${
                  highlightedIndex === index
                    ? "bg-gray-200 dark:bg-zinc-700 dark:text-zinc-50"
                    : ""
                }`}
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

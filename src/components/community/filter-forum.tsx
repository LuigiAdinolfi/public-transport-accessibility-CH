import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Component representing a demo for a select dropdown menu.
 * @returns {React.ReactElement} JSX Element
 */
export function SelectDemo(): React.ReactElement {
  return (
    <Select>
      <SelectTrigger className="md:w-[220px] md:text-base">
        {/* Select value placeholder with aria-label for accessibility */}
        <SelectValue
          placeholder="Filtern nach..."
          aria-label="Filtern nach..."
          className="md:text-base"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* Group label with aria-label for accessibility */}
          <SelectLabel className="md:text-base" aria-label="Filtern">
            Filtern
          </SelectLabel>
          {/* Select items with aria-labels for accessibility */}
          <SelectItem value="date" aria-label="Datum">
            Datum
          </SelectItem>
          <SelectItem value="accessibility" aria-label="Zugänglichkeit">
            Zugänglichkeit
          </SelectItem>
          <SelectItem value="views" aria-label="Meist gesehen">
            Meist gesehen
          </SelectItem>
          <SelectItem value="news" aria-label="Neuigkeiten">
            Neuigkeiten
          </SelectItem>
          <SelectItem value="malfunctions" aria-label="Störungen">
            Störungen
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

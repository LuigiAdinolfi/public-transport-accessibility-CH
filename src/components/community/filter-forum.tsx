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

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder="Filtern nach..."
          aria-label="Filtern nach..."
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel aria-label="Filtern">Filtern</SelectLabel>
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

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
        <SelectValue placeholder="Filtern nach..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filtern</SelectLabel>
          <SelectItem value="date">Datum</SelectItem>
          <SelectItem value="accessibility">Zugänglichkeit</SelectItem>
          <SelectItem value="views">Meist gesehen</SelectItem>
          <SelectItem value="news">Neuigkeiten</SelectItem>
          <SelectItem value="malfunctions">Störungen</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

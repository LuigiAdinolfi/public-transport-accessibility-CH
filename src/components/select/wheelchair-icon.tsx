import React from "react";
import { useTheme } from "next-themes";
import { DarkWheelchair, LightWheelchair } from "@/assets/icons/wheelchair";

/**
 * Component for displaying a wheelchair icon that changes based on the current theme.
 * @returns {React.ReactElement} The wheelchair icon component.
 */
export function WheelchairIcon(): React.ReactElement {
  const { resolvedTheme } = useTheme();

  return resolvedTheme === "dark" ? (
    <DarkWheelchair className="h-6 w-6" />
  ) : (
    <LightWheelchair className="h-6 w-6" />
  );
}

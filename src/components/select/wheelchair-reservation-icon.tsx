import React from "react";
import {
  DarkWheelchairReservation,
  LightWheelchairReservation,
} from "@/assets/icons/wheelchair-reservation";
import { useTheme } from "next-themes";

/**
 * Component for displaying a wheelchair reservation icon that changes based on the current theme.
 * @returns {React.ReactElement} The wheelchair reservation icon component.
 */
export function WheelchairReservationIcon(): React.ReactElement {
  const { resolvedTheme } = useTheme();

  return resolvedTheme === "dark" ? (
    <DarkWheelchairReservation className="h-6 w-6" />
  ) : (
    <LightWheelchairReservation className="h-6 w-6" />
  );
}

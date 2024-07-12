import React from "react";
import {
  DarkActiveCircle,
  LightActiveCircle,
  DarkInactiveCircle,
  LightInactiveCircle,
} from "@/assets/icons/active-circle";

interface CircleIconsProps {
  active: boolean;
  darkTheme: boolean;
}

/**
 * CircleIcons component displays different icons based on the active and theme states.
 *
 * @param {CircleIconsProps} props - The properties passed to the component.
 * @returns {React.ReactElement} The CircleIcons component.
 */
export function CircleIcons({
  active,
  darkTheme,
}: CircleIconsProps): React.ReactElement {
  const activeDescription = active ? "active" : "inactive";
  const themeDescription = darkTheme ? "dark theme" : "light theme";

  const ariaLabel = `Circle icon is ${activeDescription} and using ${themeDescription}`;

  return darkTheme ? (
    active ? (
      <DarkActiveCircle aria-label={ariaLabel} />
    ) : (
      <DarkInactiveCircle aria-label={ariaLabel} />
    )
  ) : active ? (
    <LightActiveCircle aria-label={ariaLabel} />
  ) : (
    <LightInactiveCircle aria-label={ariaLabel} />
  );
}

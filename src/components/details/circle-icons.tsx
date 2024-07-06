import React from "react";
import {
  DarkActiveCircle,
  LightActiveCircle,
  DarkInactiveCircle,
  LightInactiveCircle,
  DarkActiveSmallCircle,
  LightActiveSmallCircle,
  DarkInactiveSmallCircle,
  LightInactiveSmallCircle,
} from "@/assets/icons/active-circle";

interface CircleIconsProps {
  active: boolean;
  darkTheme: boolean;
  size?: "small" | "large";
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
  size = "large",
}: CircleIconsProps): React.ReactElement {
  const activeDescription = active ? "active" : "inactive";
  const themeDescription = darkTheme ? "dark theme" : "light theme";
  const ariaLabel = `Circle icon is ${activeDescription} and using ${themeDescription}`;

  if (size === "small") {
    return darkTheme ? (
      active ? (
        <DarkActiveSmallCircle aria-label={ariaLabel} />
      ) : (
        <DarkInactiveSmallCircle aria-label={ariaLabel} />
      )
    ) : active ? (
      <LightActiveSmallCircle aria-label={ariaLabel} />
    ) : (
      <LightInactiveSmallCircle aria-label={ariaLabel} />
    );
  }

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

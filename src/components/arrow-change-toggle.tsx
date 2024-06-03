"use client";

import React from "react";
import { useTheme } from "next-themes";
import { LightArrowChange } from "@/assets/icons/light-arrow-change";
import { DarkArrowChange } from "@/assets/icons/dark-arrow-change";

/**
 * Component representing an arrow icon that changes color based on the current theme.
 * @returns JSX.Element
 */
const ThemeArrowChange = () => {
  // Hook to get the current theme
  const { theme } = useTheme();

  // Render the arrow icon based on the theme
  return theme === "dark" ? (
    // Dark mode arrow icon
    <DarkArrowChange className="h-8 w-8" />
  ) : (
    // Light mode arrow icon
    <LightArrowChange className="h-8 w-8" />
  );
};

export default ThemeArrowChange;

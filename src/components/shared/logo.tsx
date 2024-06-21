"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { DarkLogo, LightLogo } from "@/assets/icons/logo";

/**
 * Component representing a logo that changes based on the theme.
 * @returns {JSX.Element} Logo component displaying either DarkLogo or LightLogo based on the current theme.
 */
export function Logo() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      {resolvedTheme === "dark" ? (
        <DarkLogo aria-label="Dark Logo" />
      ) : (
        <LightLogo aria-label="Light Logo" />
      )}
    </>
  );
}

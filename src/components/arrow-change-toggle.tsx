"use client";

import React from "react";
import { useTheme } from "next-themes";
import { LightArrowChange } from "@/assets/icons/light-arrow-change";
import { DarkArrowChange } from "@/assets/icons/dark-arrow-change";

const ThemeArrowChange = () => {
  const { theme } = useTheme();

  return theme === "dark" ? (
    <DarkArrowChange className="h-8 w-8" />
  ) : (
    <LightArrowChange className="h-8 w-8" />
  );
};

export default ThemeArrowChange;

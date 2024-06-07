"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { DarkLogo, LightLogo } from "@/assets/icons/logo";

export function Logo() {
  const { theme } = useTheme();

  return <>{theme === "dark" ? <DarkLogo /> : <LightLogo />}</>;
}

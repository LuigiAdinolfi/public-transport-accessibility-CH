"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { LightLogo } from "@/assets/icons/light-logo";
import { DarkLogo } from "@/assets/icons/dark-logo";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const { theme } = useTheme();

  return <>{theme === "dark" ? <DarkLogo /> : <LightLogo />}</>;
}

"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { DarkLogo, LightLogo } from "@/assets/icons/logo";

interface LogoProps {
  className?: string;
}

export function Logo() {
  const { theme } = useTheme();

  return <>{theme === "dark" ? <DarkLogo /> : <LightLogo />}</>;
}

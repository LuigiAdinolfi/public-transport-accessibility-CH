"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Icons } from "@/components/icons"; // Adjust the import path as needed

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const { theme } = useTheme();

  return <>{theme === "dark" ? <Icons.darkLogo /> : <Icons.lightLogo />}</>;
}

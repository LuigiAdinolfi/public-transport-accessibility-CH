"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Icons } from "@/components/icons"; // Adjust the import path as needed
export function Logo() {
  const { theme } = useTheme();

  return <>{theme === "dark" ? <Icons.darkLogo /> : <Icons.lightLogo />}</>;
}

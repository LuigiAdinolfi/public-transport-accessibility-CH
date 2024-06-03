"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * Component to provide theming functionality using Next.js theme provider.
 * @param children - Child components to render.
 * @param {ThemeProviderProps} props - Props for the ThemeProvider component.
 * @returns {JSX.Element} - ThemeProvider component.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

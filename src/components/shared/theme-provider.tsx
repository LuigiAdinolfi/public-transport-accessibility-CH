"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * Component to provide theming functionality using Next.js theme provider.
 * @param {Object} props - Props for the ThemeProvider component.
 * @param {React.ReactNode} props.children - Child components to render within the theme provider.
 * @returns {React.ReactElement} - ThemeProvider component.
 */
export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps): React.ReactElement {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

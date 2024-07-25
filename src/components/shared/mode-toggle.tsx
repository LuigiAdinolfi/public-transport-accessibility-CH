"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Component representing a mode toggle button with a dropdown menu.
 * Allows users to switch between light and dark themes.
 *
 * @returns {React.ReactElement} - The mode toggle component with dropdown menu.
 */
export function ModeToggle(): React.ReactElement {
  // Get current theme and function to set theme from next-themes
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Button to trigger the dropdown menu for theme selection */}
        <Button variant="outline" size="icon">
          {/* Sun icon for light mode */}
          <Sun
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            aria-hidden="true"
          />
          {/* Moon icon for dark mode */}
          <Moon
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            aria-hidden="true"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Dropdown menu item for light mode */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun
            className={`mr-2 h-[0.8rem] w-[0.8rem] transition-all ${theme === "light" ? "text-yellow-500" : "text-gray-500"}`}
            aria-hidden="true"
          />
          Light
        </DropdownMenuItem>
        {/* Dropdown menu item for dark mode */}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon
            className={`mr-2 h-[0.8rem] w-[0.8rem] transition-all ${theme === "dark" ? "text-yellow-500" : "text-gray-500"}`}
            aria-hidden="true"
          />
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

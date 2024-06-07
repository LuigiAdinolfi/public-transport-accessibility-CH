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
 * Component representing a mode toggle button with dropdown menu.
 * Allows users to switch between light and dark themes.
 * @returns {JSX.Element} - ModeToggle component.
 */
export function ModeToggle() {
  // Get current theme and function to set theme
  const { theme, setTheme } = useTheme();

  // Render the mode toggle button with dropdown menu
  return (
    <DropdownMenu>
      {/* Trigger button for the dropdown menu */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* Sun icon for light theme */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          {/* Moon icon for dark theme */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {/* Screen reader text for accessibility */}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      {/* Content of the dropdown menu */}
      <DropdownMenuContent align="end">
        {/* Dropdown menu item for light theme */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {/* Sun icon */}
          <Sun
            className={`mr-2 h-[0.8rem] w-[0.8rem] transition-all ${theme === "light" ? "text-yellow-500" : "text-gray-500"}`}
          />
          {/* Label for light theme */}
          Light
        </DropdownMenuItem>
        {/* Dropdown menu item for dark theme */}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {/* Moon icon */}
          <Moon
            className={`mr-2 h-[0.8rem] w-[0.8rem] transition-all ${theme === "dark" ? "text-yellow-500" : "text-gray-500"}`}
          />
          {/* Label for dark theme */}
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

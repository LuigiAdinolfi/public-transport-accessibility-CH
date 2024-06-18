"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

/**
 * Component representing the main navigation menu.
 * @returns {JSX.Element} - MainNav component.
 */
export function MainNav() {
  // Get the current pathname using the usePathname hook from next/navigation
  const pathname = usePathname();
  // Get the resolved theme using the useTheme hook from next-themes
  const { resolvedTheme } = useTheme();

  /**
   * Function to generate CSS classes based on the current path and theme.
   * @param {string} currentPath - The current path to compare with the pathname.
   * @returns {string} - CSS classes for the navigation links.
   */
  const getClasses = (currentPath: string): string => {
    // Check if the current path matches the pathname to determine if the link is active
    const isActive = pathname === currentPath;

    // Generate different classes based on the theme and link activity
    if (resolvedTheme === "dark") {
      return cn(
        "transition-colors text-white",
        isActive
          ? "bg-zinc-700 dark: zinc-700 text-white dark:text-white font-semibold"
          : "text-white hover:bg-zinc-800 hover:text-white font-semibold",
        "text-lg",
        "rounded-md p-2",
        "px-6 py-2.5",
        "focus:outline-none focus:ring-2 focus:rounded-sm focus:ring-white"
      );
    } else {
      return cn(
        "transition-colors text-zinc-950",
        isActive
          ? "bg-zinc-200 text-zinc-950 font-semibold dark:bg-zinc-700 dark:text-white"
          : "text-zinc-950 dark:text-white hover:bg-zinc-100 hover:text-zinc-950 font-semibold dark:hover:bg-zinc-800",
        "text-lg",
        "rounded-md p-2",
        "px-6 py-2.5",
        "focus:outline-none focus:ring-2 focus:rounded-sm focus:ring-black"
      );
    }
  };

  // Render the main navigation menu
  return (
    <div className="hidden md:flex">
      <nav className="flex items-center gap-4 text-sm">
        {/* Navigation links */}
        <Link href={"/"} className={getClasses("/")}>
          Reise planen
        </Link>
        <Link href={"/community"} className={getClasses("/community")}>
          Community
        </Link>
        <Link href={"/settings"} className={getClasses("/settings")}>
          Einstellungen
        </Link>
      </nav>
    </div>
  );
}

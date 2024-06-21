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
  function getClasses(currentPath: string): string {
    // Check if the current path matches the pathname to determine if the link is active
    const isActive = pathname === currentPath;

    // Generate different classes based on the theme and link activity
    if (resolvedTheme === "dark") {
      return cn(
        "transition-colors text-white",
        isActive
          ? "bg-zinc-700 dark:zinc-700 text-white dark:text-white font-semibold"
          : "text-white hover:bg-zinc-800 hover:text-white font-semibold",
        "text-lg",
        "rounded-md p-2",
        "px-6 py-2.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:after:ring-0 focus-visible:rounded-sm focus-visible:ring-black dark:focus-visible:ring-white"
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
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:after:ring-0 focus-visible:rounded-sm focus-visible:ring-black dark:focus-visible:ring-white"
      );
    }
  }

  /**
   * Component representing a navigation link with active state styling.
   * @param {Object} props - Component props.
   * @param {string} props.href - The URL path for the link.
   * @param {string} props.currentPath - The current path to compare with the link's URL.
   * @returns {JSX.Element} - NavLink component.
   */
  function NavLink({ href, currentPath, children }: { href: string; currentPath: string; children: React.ReactNode }): JSX.Element {
    const linkClasses = getClasses(currentPath);

    return (
      <Link href={href} className={linkClasses}>
        {children}
      </Link>
    );
  }

  // Render the main navigation menu
  return (
    <div className="hidden md:flex">
      <nav className="flex items-center gap-4 text-sm">
        {/* Navigation links */}
        <NavLink href="/" currentPath="/">
          Reise planen
        </NavLink>
        <NavLink href="/community" currentPath="/community">
          Community
        </NavLink>
        <NavLink href="/settings" currentPath="/settings">
          Einstellungen
        </NavLink>
      </nav>
    </div>
  );
}

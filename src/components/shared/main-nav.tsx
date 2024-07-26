"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

/**
 * Component representing the main navigation menu.
 *
 * This component renders a navigation menu with links to various pages.
 * It highlights the active link based on the current pathname and applies
 * different styles based on the theme (dark or light).
 *
 * @returns {React.ReactElement} - The main navigation menu component.
 */
export function MainNav(): React.ReactElement {
  // Get the current pathname using the usePathname hook from next/navigation
  const pathname = usePathname();
  // Get the resolved theme using the useTheme hook from next-themes
  const { resolvedTheme } = useTheme();

  /**
   * Function to generate CSS classes based on the current path and theme.
   *
   * This function determines the CSS classes for navigation links, including
   * active link styles and theme-based colors.
   *
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
        isActive ? "text-zinc-50 font-bold" : "text-zinc-400",
        "text-xl",
        "rounded-md p-2",
        "px-6 py-3",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:after:ring-0 focus-visible:rounded-sm focus-visible:ring-black dark:focus-visible:ring-white",
      );
    } else {
      return cn(
        "transition-colors text-zinc-950",
        isActive ? "text-zinc-950 font-bold" : "text-zinc-600",
        "text-xl",
        "rounded-md p-2",
        "px-6 py-3",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:after:ring-0 focus-visible:rounded-sm focus-visible:ring-black dark:focus-visible:ring-white",
      );
    }
  }

  /**
   * Component representing a navigation link with active state styling.
   *
   * This component renders a link with styles applied based on whether it is
   * active (i.e., if the link's URL matches the current pathname). It also
   * provides an aria-label for accessibility.
   *
   * @param {Object} props - Component props.
   * @param {string} props.href - The URL path for the link.
   * @param {string} props.currentPath - The current path to compare with the link's URL.
   * @param {React.ReactNode} props.children - The content to display within the link.
   * @returns {React.ReactElement} - The rendered navigation link.
   */
  function NavLink({
    href,
    currentPath,
    children,
  }: {
    href: string;
    currentPath: string;
    children: React.ReactNode;
  }): React.ReactElement {
    const linkClasses = getClasses(currentPath);
    const ariaLabel = `Go to ${children}`;

    return (
      <Link href={href} className={linkClasses} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  // Render the main navigation menu
  return (
    <div className="hidden md:flex">
      <nav className="flex items-center gap-4 text-sm">
        <ul className="flex space-x-4">
          <li>
            <NavLink href="/" currentPath="/">
              Reise planen
            </NavLink>
          </li>
          <li>
            <NavLink href="/community" currentPath="/community">
              Community
            </NavLink>
          </li>
          <li>
            <NavLink href="/account" currentPath="/account">
              Mein Konto
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

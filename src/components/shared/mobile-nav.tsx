"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accessibility, Home, UserCog, Users } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Mobile navigation component for responsive design.
 *
 * This component renders a mobile-friendly navigation menu with buttons for
 * different sections (Home, Community, Settings). It highlights the active
 * link and updates the route based on user interaction.
 *
 * @returns {React.ReactElement} - The mobile navigation component.
 */
export function MobileNav() {
  // State to track the currently active link
  const [activeLink, setActiveLink] = useState("/");
  const router = useRouter();

  /**
   * Handle navigation link clicks.
   *
   * Updates the active link state and navigates to the specified route.
   *
   * @param {string} s - The URL path to navigate to.
   */
  function handleLinkClick(s: string): void {
    setActiveLink(s);
    router.push(s);
  }

  return (
    <div className="flex w-full md:hidden">
      <div className="flex items-center justify-start rounded-md focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white">
        <Accessibility className="h-6 w-6 sm:block md:hidden" />
      </div>
      <nav className="flex w-full justify-center gap-2 sm:gap-4">
        {/* Home Button */}
        <Button
          variant="secondary"
          className={`flex items-center gap-4 px-2.5 ${activeLink === "/" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
          onClick={() => handleLinkClick("/")}
        >
          <Home className="h-6 w-6" />
          <div className="sr-only">Reise Planen</div>
        </Button>

        {/* Community Button */}
        <Button
          variant="secondary"
          className={`flex items-center gap-4 px-2.5 ${activeLink === "/community" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
          onClick={() => handleLinkClick("/community")}
        >
          <Users className="h-6 w-6" />
          <div className="sr-only">Community</div>
        </Button>

        {/* Account Button */}
        <Button
          variant="secondary"
          className={`flex items-center gap-4 px-2.5 ${activeLink === "/account" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
          onClick={() => handleLinkClick("/account")}
        >
          <UserCog className="h-6 w-6" />
          <div className="sr-only">Mein Konto</div>
        </Button>
      </nav>
    </div>
  );
}

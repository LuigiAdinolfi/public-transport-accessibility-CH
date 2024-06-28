import { MainNav } from "@/components/shared/main-nav";
import { MobileNav } from "@/components/shared/mobile-nav";
import { ModeToggle } from "@/components/shared/mode-toggle";
import * as React from "react";
import { Company } from "@/components/shared/company";

/**
 * Component representing the site header with company logo, navigation, and theme toggle.
 * @returns {React.ReactElement} - SiteHeader component.
 */
export default function SiteHeader(): React.ReactElement {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        {/* Company logo and name */}
        <Company />
        {/* Navigation and mode toggle */}
        <div className="flex flex-1 items-center justify-between space-x-1 lg:justify-end">
          {/* Main navigation for larger screens */}
          <MainNav />

          {/* Mobile navigation menu */}
          <MobileNav />

          {/* Spacer */}
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>

          {/* Mode toggle for theme */}
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

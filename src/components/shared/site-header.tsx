import { MainNav } from "@/components/shared/main-nav";
import { MobileNav } from "@/components/shared/mobile-nav";
import { ModeToggle } from "@/components/shared/mode-toggle";
import * as React from "react";
import { Company } from "@/components/shared/company";

/**
 * Component representing the site header.
 * @returns {JSX.Element} - SiteHeader component.
 */
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        {/* Company logo and name */}
        <Company />
        {/* Navigation components */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Main navigation */}
          <MainNav />
          {/* Mobile navigation */}
          <MobileNav />
          {/* Spacer */}
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          {/* Mode toggle (light/dark) */}
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

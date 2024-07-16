import React from "react";
import { MainNav } from "@/components/shared/main-nav";
import { MobileNav } from "@/components/shared/mobile-nav";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Accessibility } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * Component representing the site header.
 * @returns {React.ReactElement} - SiteHeader component.
 */
export default function SiteHeader(): React.ReactElement {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 w-full max-w-screen-2xl items-center justify-between">
        <div className="hidden space-x-2 py-2 pr-1 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:after:ring-0 dark:focus-visible:rounded-sm dark:focus-visible:outline-none dark:focus-visible:ring-2 dark:focus-visible:ring-white dark:focus-visible:after:ring-0 md:flex md:w-full">
          <Accessibility className="h-6 w-6" />
          <span className="font-bold md:inline-block md:text-base lg:text-xl">
            {siteConfig.name}
          </span>
        </div>
        <div className="flex w-full items-center justify-between space-x-1 sm:justify-end">
          <MainNav />
          <MobileNav />
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

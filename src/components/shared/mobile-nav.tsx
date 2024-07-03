"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accessibility, Home, Plane, Settings, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export function MobileNav() {
  const [activeLink, setActiveLink] = useState("/");
  const router = useRouter();

  function handleLinkClick(s: string) {
    setActiveLink(s);
    router.push(s);
  }

  return (
    <div className="flex w-full md:hidden">
      <Link
        href="/"
        passHref
        className="flex items-center justify-start rounded-md focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
      >
        <Accessibility className="h-6 w-6 sm:block md:hidden" />
      </Link>
      <nav className="flex w-full justify-center gap-2 sm:gap-4">
        <Button
          variant="secondary"
          className={`flex items-center gap-4 px-2.5 ${activeLink === "/" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
          onClick={() => handleLinkClick("/")}
        >
          <Home className="h-6 w-6" />
          <div className="sr-only">Reise Planen</div>
        </Button>
        <Button
          variant="secondary"
          className={`flex items-center gap-4 px-2.5 ${activeLink === "/community" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
          onClick={() => handleLinkClick("/community")}
        >
          <Users className="h-6 w-6" />
          <div className="sr-only">Community</div>
        </Button>
        <Button
          variant="secondary"
          className={`flex items-center gap-4 px-2.5 ${activeLink === "/settings" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
          onClick={() => handleLinkClick("/settings")}
        >
          <Settings className="h-6 w-6" />
          <div className="sr-only">Einstellungen</div>
        </Button>
      </nav>
    </div>
  );
}

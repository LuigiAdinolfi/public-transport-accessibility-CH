"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();
  const { theme } = useTheme();

  const getClasses = (currentPath: string): string => {
    const isActive = pathname === currentPath;

    if (theme === "light") {
      return cn(
        "transition-colors",
        isActive
          ? "bg-zinc-950 text-zinc-50"
          : "text-foreground/100 hover:bg-zinc-600 hover:text-zinc-50",
        "text-lg",
        "rounded-md p-2",
        "px-4 py-2",
      );
    } else {
      return cn(
        "transition-colors",
        isActive
          ? "bg-zinc-50 text-zinc-950"
          : "text-foreground/100 hover:bg-zinc-600 hover:text-zinc-50",
        "text-lg",
        "rounded-md p-2",
        "px-4 py-2",
      );
    }
  };

  return (
    <div className="mr-4 hidden md:flex">
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link href={"/plan"} className={getClasses("/plan")}>
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

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/100",
            "hover:bg-zinc-600 hover:text-zinc-50",
            pathname === "/"
              ? "bg-zinc-950 text-zinc-50"
              : "text-foreground/100",
            "text-lg",
            "rounded-md p-2",
            "px-4 py-2",
          )}
        >
          Plan a journey
        </Link>
        <Link
          href={"/community"}
          className={cn(
            "transition-colors hover:text-foreground/100",
            "hover:bg-zinc-600 hover:text-zinc-50",
            pathname === "/community"
              ? "bg-zinc-950 text-zinc-50"
              : "text-foreground/100",
            "text-lg",
            "rounded-md p-2",
            "px-4 py-2",
          )}
        >
          Community
        </Link>
        <Link
          href={"/settings"}
          className={cn(
            "transition-colors hover:text-foreground/100",
            "hover:bg-zinc-600 hover:text-zinc-50",
            pathname === "/settings"
              ? "bg-zinc-950 text-zinc-50"
              : "text-foreground/100",
            "text-lg",
            "rounded-md p-2",
            "px-4 py-2",
          )}
        >
          Settings
        </Link>
      </nav>
    </div>
  );
}

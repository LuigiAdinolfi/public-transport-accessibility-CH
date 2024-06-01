import { Logo } from "@/components/logo";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import * as React from "react";

export function Company() {
  return (
    <Link
      href="/"
      className="mr-6 flex items-center space-x-2 rounded-md p-2 px-4 py-2"
    >
      <Logo className="h-6 w-6" />
      <span className="hidden text-2xl font-bold sm:inline-block">
        {siteConfig.name}
      </span>
    </Link>
  );
}

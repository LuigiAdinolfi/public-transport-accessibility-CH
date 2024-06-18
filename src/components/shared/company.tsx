import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import * as React from "react";

/**
 * Component representing the company logo and name, linking to the pages.
 * @returns JSX.Element
 */
export function Company() {
  return (
    <Link
      href="/"
      className="mr-6 flex items-center space-x-2 rounded-md py-2 focus:outline-none focus:ring-2 focus:rounded-sm focus:ring-black dark:focus:ring-white pr-1"
    >
      <Logo />
      <span className="hidden text-xl font-bold sm:inline-block">
        {siteConfig.name}
      </span>
    </Link>
  );
}

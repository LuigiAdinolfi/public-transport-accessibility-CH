import { Logo } from "@/components/logo";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import * as React from "react";

/**
 * Component representing the company logo and name, linking to the home page.
 * @returns JSX.Element
 */
export function Company() {
  return (
    <Link href="/" className="mr-6 flex items-center space-x-2 rounded-md py-2">
      <Logo className="h-6 w-6" />
      <span className="hidden text-2xl font-bold sm:inline-block">
        {siteConfig.name}
      </span>
    </Link>
  );
}

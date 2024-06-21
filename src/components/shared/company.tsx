import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import * as React from "react";

/**
 * Component representing the company logo and name, linking to the home page.
 * @returns {JSX.Element} Company component with logo and name.
 */
export function Company() {
  return (
    <Link href="/" passHref className="mr-6 flex items-center space-x-2 rounded-md py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:after:ring-0 focus-visible:rounded-sm focus-visible:ring-black dark:focus-visible:ring-white pr-1"
      >
        <Logo />
        <span className="hidden text-xl font-bold sm:inline-block">
          {siteConfig.name}
        </span>
    </Link>
  );
}

import { siteConfig } from "@/config/site";
import Link from "next/link";
import * as React from "react";
import { Accessibility } from "lucide-react";

/**
 * Component representing the company logo and name, linking to the home page.
 * @returns {React.ReactElement} The company logo and name.
 */
export function Company(): React.ReactElement {
  return (
    <Link
      href="/"
      passHref
      className="flex items-center space-x-2 rounded-md py-2 pr-1 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:after:ring-0 dark:focus-visible:ring-white lg:mr-6"
    >
      <Accessibility className="h-6 w-6" />
      <span className="hidden font-bold sm:inline-block md:text-base lg:text-xl">
        {siteConfig.name}
      </span>
    </Link>
  );
}

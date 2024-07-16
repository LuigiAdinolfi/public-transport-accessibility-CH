import { siteConfig } from "@/config/site";
import React from "react";

/**
 * Component representing the site footer with attribution and links.
 * @returns {React.ReactElement} - The site footer component.
 */
export function SiteFooter(): React.ReactElement {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24">
        {/* Text content */}
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground text-zinc-600 dark:text-zinc-400 md:text-left">
          {/* Attribution */}
          Built by{" "}
          <a
            href={siteConfig.links.github_luigi}
            rel="noopener noreferrer"
            className="px-1 font-medium underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:after:ring-0 dark:focus-visible:ring-white"
          >
            Luigi Adinolfi
          </a>
          &nbsp;&&nbsp;
          <a
            href={siteConfig.links.github_raveena}
            rel="noopener noreferrer"
            className="px-1 font-medium underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:after:ring-0 dark:focus-visible:ring-white"
          >
            Raveena Ramany
          </a>
          . The source code is available on {/* Link to GitLab */}
          <a
            href={siteConfig.links.gitlab}
            rel="noopener noreferrer"
            className="px-1 font-medium underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:after:ring-0 dark:focus-visible:ring-white"
          >
            GitLab
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

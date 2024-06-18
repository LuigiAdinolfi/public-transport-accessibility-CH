import { siteConfig } from "@/config/site";

/**
 * Component representing the site footer.
 * @returns {JSX.Element} - SiteFooter component.
 */
export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24">
        {/* Text content */}
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground text-zinc-600 dark:text-zinc-400 md:text-left">
          {/* Built by Luigi Adinolfi */}
          Built by{" "}
          <a
            href={siteConfig.links.github_luigi}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 focus:outline-none focus:ring-2 focus:rounded-sm focus:ring-black dark:focus:ring-white px-1"
          >
            Luigi Adinolfi
          </a>
          &nbsp;&&nbsp;
          {/* Built by Raveena Ramany */}
          <a
            href={siteConfig.links.github_raveena}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 focus:outline-none focus:ring-2 focus:rounded-sm focus:ring-black dark:focus:ring-white px-1"
          >
            Raveena Ramany
          </a>
          . The source code is available on {/* Link to GitLab */}
          <a
            href={siteConfig.links.gitlab}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 focus:outline-none focus:ring-2 focus:rounded-sm focus:ring-black dark:focus:ring-white px-1"
          >
            GitLab
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

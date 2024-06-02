import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href={siteConfig.links.github_luigi}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Luigi Adinolfi
          </a>
          &nbsp;&&nbsp;
          <a
            href={siteConfig.links.github_raveena}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Raveena Ramany
          </a>
          . The source code is available on{" "}
          <a
            href={siteConfig.links.gitlab}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitLab
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

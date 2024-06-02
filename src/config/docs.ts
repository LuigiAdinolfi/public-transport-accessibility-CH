import { MainNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Reise planen",
      href: "/plan",
    },
    {
      title: "Community",
      href: "/community",
    },
    {
      title: "Einstellungen",
      href: "/settings",
    },
  ],
};

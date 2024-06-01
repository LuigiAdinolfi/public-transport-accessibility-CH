import { MainNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Plan a Journey",
      href: "/",
    },
    {
      title: "Community",
      href: "/community",
    },
    {
      title: "Settings",
      href: "/settings",
    },
  ],
};

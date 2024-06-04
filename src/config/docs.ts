import { MainNavItem } from "@/types/nav";

/**
 * Interface for defining the configuration of documentation navigation items.
 */
interface DocsConfig {
  mainNav: MainNavItem[]; // Array of main navigation items
}

/**
 * Configuration object for documentation navigation.
 */
export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Reise planen", // Title of the navigation item
      href: "/", // URL path of the navigation item
    },
    {
      title: "Community", // Title of the navigation item
      href: "/community", // URL path of the navigation item
    },
    {
      title: "Einstellungen", // Title of the navigation item
      href: "/settings", // URL path of the navigation item
    },
  ],
};

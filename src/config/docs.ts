/**
 * Interface for defining the configuration of documentation navigation items.
 */
interface DocsConfig {
  mainNav: NavItem[]; // Array of main navigation items
}

interface NavItem {
  /**
   * The title or display text of the navigation item.
   */
  title: string;

  /**
   * The URL path the navigation item links to, if applicable.
   */
  href?: string;
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
      title: "Mein Konto", // Title of the navigation item
      href: "/account", // URL path of the navigation item
    },
  ],
};

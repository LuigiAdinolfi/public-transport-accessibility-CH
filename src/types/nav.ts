/**
 * Represents a navigation item.
 */
export interface NavItem {
  /**
   * The title or display text of the navigation item.
   */
  title: string;

  /**
   * The URL path the navigation item links to, if applicable.
   */
  href?: string;

  /**
   * Specifies if the navigation item is disabled. Defaults to `false`.
   */
  disabled?: boolean;

  /**
   * Specifies if the navigation item links to an external resource. Defaults to `false`.
   */
  external?: boolean;

  /**
   * An optional label associated with the navigation item.
   */
  label?: string;
}

/**
 * Represents a navigation item with children.
 * Extends the `NavItem` interface.
 */
export interface NavItemWithChildren extends NavItem {
  /**
   * An array of child navigation items.
   */
  items: NavItemWithChildren[];
}

/**
 * Represents a main navigation item.
 * Inherits properties from the `NavItem` interface.
 */
export interface MainNavItem extends NavItem {}

/**
 * Interface representing a breadcrumb item with a name and URL.
 *
 * This interface defines the structure of an individual breadcrumb item, which includes
 * a display name and a corresponding URL for navigation purposes.
 *
 * @interface
 */
export interface MyBreadcrumbItem {
  /**
   * The display name of the breadcrumb item.
   *
   * @type {string}
   */
  name: string;

  /**
   * The URL associated with the breadcrumb item.
   *
   * @type {string}
   */
  url: string;
}

/**
 * Array of breadcrumb items for journey planning navigation.
 *
 * This array represents the breadcrumb trail for journey planning, showing the hierarchy
 * of navigation steps from starting to selecting and viewing journey details.
 *
 * @type {MyBreadcrumbItem[]}
 */
const JourneyBreadcrumbList: MyBreadcrumbItem[] = [
  {
    name: "Reise planen",
    url: "/",
  },
  {
    name: "Reise auswählen",
    url: "/select",
  },
  {
    name: "Reise Details",
    url: "/select/details",
  },
  {
    name: "Haltestelle",
    url: "/select/details/stop",
  },
];

/**
 * Array of breadcrumb items for community navigation.
 *
 * This array represents the breadcrumb trail for community-related navigation, typically
 * showing the main community page.
 *
 * @type {MyBreadcrumbItem[]}
 */
const CommunityBreadcrumbList: MyBreadcrumbItem[] = [
  {
    name: "Community",
    url: "/community",
  },
];

export { JourneyBreadcrumbList, CommunityBreadcrumbList };

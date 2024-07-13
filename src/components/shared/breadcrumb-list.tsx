/**
 * Interface representing a breadcrumb item with a name and URL.
 */
export interface MyBreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Array of breadcrumb items for journey planning navigation.
 * @type {BreadcrumbItem[]}
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
 * @type {BreadcrumbItem[]}
 */
const CommunityBreadcrumbList: MyBreadcrumbItem[] = [
  {
    name: "Community",
    url: "/community",
  },
];

export { JourneyBreadcrumbList, CommunityBreadcrumbList };

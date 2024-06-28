/**
 * Interface representing a breadcrumb item with a name and URL.
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Array of breadcrumb items for journey planning navigation.
 * @type {BreadcrumbItem[]}
 */
const MyBreadcrumbList: BreadcrumbItem[] = [
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

export { MyBreadcrumbList };

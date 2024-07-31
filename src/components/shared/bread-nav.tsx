"use client";

import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MyBreadcrumbItem } from "@/components/shared/breadcrumb-list";
import { useRouter } from "next/navigation";

/**
 * Breadcrumb component for displaying navigation links in a hierarchical structure.
 *
 * This component renders a list of breadcrumb links based on the provided `breadcrumbList`
 * and highlights the current page. It also supports keyboard navigation for accessibility.
 *
 * @param {Object} props - Component props.
 * @param {string} props.currentPage - The URL of the current page to highlight.
 * @param {MyBreadcrumbItem[]} props.breadcrumbList - List of breadcrumb items to display.
 * @returns {React.ReactElement} The rendered Breadcrumb component.
 */
export function MyBreadcrumb({
  currentPage,
  breadcrumbList,
}: {
  currentPage: string;
  breadcrumbList: MyBreadcrumbItem[];
}): React.ReactElement {
  const currentIndex = breadcrumbList.findIndex(
    (item) => item.url === currentPage,
  );
  const router = useRouter();

  /**
   * Handles the key down event for keyboard accessibility.
   *
   * Allows users to navigate to a different page by pressing "Enter" on a breadcrumb link.
   *
   * @param {React.KeyboardEvent<HTMLAnchorElement>} e - The keyboard event.
   * @param {string} url - The URL to navigate to.
   */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    url: string,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(url);
    }
  };

  return (
    <Breadcrumb className="w-full text-left">
      <BreadcrumbList className="md:text-xl">
        {breadcrumbList.slice(0, currentIndex + 1).map((item, index) => {
          const isLastPath = currentIndex === index;

          return (
            <Fragment key={index}>
              <BreadcrumbItem className="text-zinc-600 dark:text-zinc-400 lg:h-12">
                {!isLastPath ? (
                  <BreadcrumbLink
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(item.url);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, item.url)}
                    tabIndex={0}
                    className="flex cursor-pointer items-center p-1 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:after:ring-0 dark:focus-visible:ring-white lg:h-11"
                    aria-current={isLastPath ? "page" : undefined}
                  >
                    {item.name}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage
                    className="flex items-center p-1 font-bold lg:h-11"
                    aria-current="page"
                  >
                    {item.name}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLastPath && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

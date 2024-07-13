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
 * Breadcrumb component displaying navigation links.
 * @param {Object} props - Props for MyBreadcrumb component.
 * @param {string} props.currentPage - The current page URL.
 * @returns {React.ReactElement} - MyBreadcrumb component.
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
   * Handle key down event for accessibility navigation.
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
      <BreadcrumbList className="md:text-lg">
        {breadcrumbList.slice(0, currentIndex + 1).map((item, index) => {
          const isLastPath = currentIndex === index;

          return (
            <Fragment key={index}>
              <BreadcrumbItem className="text-zinc-600 dark:text-zinc-400">
                {!isLastPath ? (
                  <BreadcrumbLink
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(item.url);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, item.url)}
                    tabIndex={0}
                    className="cursor-pointer p-1 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:after:ring-0 dark:focus-visible:ring-white"
                    aria-current={isLastPath ? "page" : undefined}
                  >
                    {item.name}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="p-1 font-bold" aria-current="page">
                    {item.name}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {isLastPath ? null : <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

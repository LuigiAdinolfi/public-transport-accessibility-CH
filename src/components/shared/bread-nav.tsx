"use client";

import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { MyBreadcrumbList } from "@/components/shared/breadcrumb-list";
import { useRouter } from "next/navigation";

interface MyBreadcrumbProps {
  currentPage: string;
}

export function MyBreadcrumb({ currentPage }: MyBreadcrumbProps) {
  const currentIndex = MyBreadcrumbList.findIndex(item => item.url === currentPage);
  const router = useRouter();
  const handleKeyDown = (e: { key: string; preventDefault: () => void; }, url: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(url);
    }
  };

  return (
    <Breadcrumb className="w-full px-2 text-left lg:w-[960px]">
      <BreadcrumbList className="text-base">
        {MyBreadcrumbList.slice(0, currentIndex + 1).map((item, index) => {
          const isLastPath = currentIndex === index;

          return (
            <Fragment key={index}>
              <BreadcrumbItem className="text-zinc-600 dark:text-zinc-400">
                {!isLastPath ?
                  <BreadcrumbLink onClick={(e) => {
                    e.preventDefault();
                    router.push(item.url);
                  }}
                                  onKeyDown={(e) => handleKeyDown(e, item.url)}
                                  tabIndex={0}
                                  className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:after:ring-0 focus-visible:rounded-sm focus-visible:ring-black dark:focus-visible:ring-white p-1">
                    {item.name}
                  </BreadcrumbLink>
                  :
                  <BreadcrumbPage className="font-bold p-1">
                    {item.name}
                  </BreadcrumbPage>
                }
              </BreadcrumbItem>
              {isLastPath ? null : <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default MyBreadcrumb;
"use client";

import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { StopPoint } from "@/components/stop/stop-point";
import { useJourneyStore } from "@/store/useJourneyStore";
import { MyBreadcrumbList } from "@/components/shared/breadcrumb-list";
import React from "react";
import { truncateTo20Chars } from "@/utils/tripUtils";

/**
 * Component for displaying stop point page.
 * @returns {React.ReactElement} The stop point page component.
 */

export default function StopPointPage(): React.ReactElement {
  const currentPage = "/select/details/stop";
  const { selectedStop } = useJourneyStore();
  MyBreadcrumbList[3].name = truncateTo20Chars(selectedStop);

  return (
    <>
      <div className="w-full max-w-screen-lg px-0">
        <MyBreadcrumb currentPage={currentPage} />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <StopPoint />
      </div>
    </>
  );
}

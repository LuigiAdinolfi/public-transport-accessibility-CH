import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { PlanJourney } from "@/components/plan/plan-journey";
import "@smastrom/react-rating/style.css";
import React from "react";
import { JourneyBreadcrumbList } from "@/components/shared/breadcrumb-list";

/**
 * Homepage component for the application.
 * Renders the main content including breadcrumb navigation and journey planning section.
 *
 * @returns {React.ReactElement} The homepage component containing breadcrumb and journey planning UI.
 */
export default function Homepage(): React.ReactElement {
  const currentPage = "/";

  return (
    <>
      <div className="w-full max-w-screen-lg px-0">
        {/* Renders the breadcrumb navigation with the current page and breadcrumb list */}
        <MyBreadcrumb
          currentPage={currentPage}
          breadcrumbList={JourneyBreadcrumbList}
        />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        {/* Hidden title for accessibility */}
        <h1 className="sr-only mb-6 text-2xl font-bold">Reise planen</h1>
        {/* Renders the journey planning section */}
        <PlanJourney />
      </div>
    </>
  );
}

import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { PlanJourney } from "@/components/plan/plan-journey";
import "@smastrom/react-rating/style.css";
import React from "react";
import { JourneyBreadcrumbList } from "@/components/shared/breadcrumb-list";

/**
 * Homepage component for the application.
 * Renders the main content including breadcrumb and journey planning.
 * @returns {React.ReactElement} The homepage component.
 */
export default function Homepage(): React.ReactElement {
  const currentPage = "/";
  return (
    <>
      <div className="w-full max-w-screen-lg px-0">
        <MyBreadcrumb
          currentPage={currentPage}
          breadcrumbList={JourneyBreadcrumbList}
        />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <PlanJourney />
      </div>
    </>
  );
}

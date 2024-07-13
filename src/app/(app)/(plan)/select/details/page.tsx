import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { JourneyDetails } from "@/components/details/journey-details";
import * as React from "react";
import { JourneyBreadcrumbList } from "@/components/shared/breadcrumb-list";

/**
 * Component for displaying journey details page.
 * @returns {React.ReactElement} The journey details page component.
 */
export default function JourneyDetailsPage(): React.ReactElement {
  const currentPage = "/select/details";

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="w-full max-w-screen-lg px-0">
        <MyBreadcrumb
          currentPage={currentPage}
          breadcrumbList={JourneyBreadcrumbList}
        />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <JourneyDetails />
      </div>
    </>
  );
}

import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { JourneyDetails } from "@/components/details/journey-details";
import * as React from "react";

/**
 * Component for displaying journey details page.
 * @returns {React.ReactElement} The journey details page component.
 */
export default function JourneyDetailsPage(): React.ReactElement {
  const currentPage = "/select/details";

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div>
        <MyBreadcrumb currentPage={currentPage} />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <JourneyDetails />
      </div>
    </>
  );
}

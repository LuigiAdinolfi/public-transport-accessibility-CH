import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { SelectJourney } from "@/components/select/select-journey";
import * as React from "react";
import { JourneyBreadcrumbList } from "@/components/shared/breadcrumb-list";

/**
 * Component for the Select page, which displays the journey selection interface.
 * This component includes breadcrumb navigation and the main content area for journey selection.
 *
 * @returns {React.ReactElement} The Select page component containing breadcrumb navigation and journey selection.
 */
export default function SelectPage(): React.ReactElement {
  const currentPage = "/select";

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
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-5 lg:p-8">
        {/* Journey selection interface */}
        <SelectJourney />
      </div>
    </>
  );
}

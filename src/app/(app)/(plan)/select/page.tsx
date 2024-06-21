import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { SelectJourney } from "@/components/select/select-journey";
import * as React from "react";

/**
 * Component for the Select page, displaying journey selection.
 * @returns {JSX.Element} - SelectPage component.
 */
export default function SelectPage() {
  const currentPage = "/select";

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div>
        <MyBreadcrumb currentPage={currentPage} />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <SelectJourney />
      </div>
    </>
  );
}

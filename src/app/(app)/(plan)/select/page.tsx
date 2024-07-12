import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { SelectJourney } from "@/components/select/select-journey";
import * as React from "react";

/**
 * Component for the Select page, displaying journey selection.
 * @returns {React.ReactElement} The Select page component.
 */
export default function SelectPage(): React.ReactElement {
  const currentPage = "/select";

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="w-full max-w-screen-lg px-0">
        <MyBreadcrumb currentPage={currentPage} />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <SelectJourney />
      </div>
    </>
  );
}

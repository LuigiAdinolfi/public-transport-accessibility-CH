import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { CommunityCard } from "@/components/community/card-community";

import * as React from "react";

/**
 * Component for the Community page, displaying community-related content.
 * @returns {JSX.Element} - CommunityPage component.
 */
export default function CommunityPage() {
  const currentPage = "/community";

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div>
        <MyBreadcrumb currentPage={currentPage} />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center py-6 lg:p-10">
        <h1 className="mb-2.5">News und Forum</h1> {/* Adjusted margin-bottom to 10px */}
        <CommunityCard />
      </div>
    </>
  );
}
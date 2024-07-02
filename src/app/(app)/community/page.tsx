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
      <div className="mb-0"> {/* Remove margin between breadcrumb and main content */}
        <MyBreadcrumb currentPage={currentPage} />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center py-0 lg:p-0"> {/* Remove padding around main content */}
      
        <CommunityCard />
      </div>
    </>
  );
}
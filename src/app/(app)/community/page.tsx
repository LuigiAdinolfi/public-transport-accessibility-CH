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
      
      {/* Main Content */}
      <div className="flex min-h-screen w-full flex-col items-center justify-start py-0 lg:p-0"> {/* Adjusted for content to be at the top and centered */} {/* Remove padding around main content */}
      
        <CommunityCard />
      </div>
    </>
  );
}
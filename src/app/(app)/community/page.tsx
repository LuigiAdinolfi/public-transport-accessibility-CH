import React from "react";
import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { CommunityCard } from "@/components/community/card-community";
import { CommunityBreadcrumbList } from "@/components/shared/breadcrumb-list";

/**
 * Component for the Community page, which displays community-related content.
 * This includes breadcrumb navigation and a community card with relevant details.
 *
 * @returns {React.ReactElement} - The CommunityPage component, which includes breadcrumb navigation and community content.
 */
export default function CommunityPage(): React.ReactElement {
  const currentPage = "/community";

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="w-full max-w-screen-lg px-0">
        <MyBreadcrumb
          currentPage={currentPage}
          breadcrumbList={CommunityBreadcrumbList}
        />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        {/* Hidden heading for accessibility */}
        <h1 className="sr-only">Community</h1>
        {/* Component displaying community-related information */}
        <CommunityCard />
      </div>
    </>
  );
}

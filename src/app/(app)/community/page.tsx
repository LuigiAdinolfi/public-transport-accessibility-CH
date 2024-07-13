import React from "react";
import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { CommunityCard } from "@/components/community/card-community";
import { CommunityBreadcrumbList } from "@/components/shared/breadcrumb-list";

/**
 * Component for the Community page, displaying community-related content.
 * @returns {React.ReactElement} - CommunityPage component.
 */
export default function CommunityPage(): React.ReactElement {
  const currentPage = "/community";

  return (
    <>
      <div className="w-full max-w-screen-lg px-0">
        <MyBreadcrumb
          currentPage={currentPage}
          breadcrumbList={CommunityBreadcrumbList}
        />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <CommunityCard />
      </div>
    </>
  );
}

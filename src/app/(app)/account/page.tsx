import React from "react";
import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { AccountBreadcrumbList } from "@/components/shared/breadcrumb-list";
import { AccountCard } from "@/components/account/card-account";

export default function Account(): React.ReactElement {
  const currentPage = "/account";

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="w-full max-w-screen-lg px-0">
        <MyBreadcrumb
          currentPage={currentPage}
          breadcrumbList={AccountBreadcrumbList}
        />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-5 lg:p-8">
        {/* Hidden heading for accessibility */}
        <h1 className="sr-only">Account</h1>
        {/* Component displaying account-related information */}
        <AccountCard />
      </div>
    </>
  );
}

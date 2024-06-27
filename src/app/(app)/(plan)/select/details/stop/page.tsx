"use client";

import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { StopPoint } from "@/components/stop/stop-point";
import { useJourneyStore } from "@/store/useJourneyStore";
import { MyBreadcrumbList } from "@/components/shared/breadcrumb-list";

export default function StopPointPage() {
  const currentPage = "/select/details/stop";
  const { selectedStop } = useJourneyStore();
  MyBreadcrumbList[3].name = selectedStop;

  return (
    <>
      <div>
        <MyBreadcrumb currentPage={currentPage} />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <StopPoint />
      </div>
    </>
  );
}

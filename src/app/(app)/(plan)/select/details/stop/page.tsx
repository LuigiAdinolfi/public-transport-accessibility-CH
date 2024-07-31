"use client";

import { StopPoint } from "@/components/stop/stop-point";
import { useJourneyStore } from "@/store/useJourneyStore";
import { JourneyBreadcrumbList } from "@/components/shared/breadcrumb-list";
import React, { useEffect } from "react";
import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { useParkingLotStore } from "@/store/useParkingLotStore";

/**
 * Component for displaying the stop point page.
 * This component includes breadcrumb navigation and the stop point details.
 *
 * @returns {React.ReactElement} The stop point page component with breadcrumb navigation and stop point details.
 */
export default function StopPointPage(): React.ReactElement {
  const currentPage = "/select/details/stop";
  const { selectedStop, setSelectedStop } = useJourneyStore();
  JourneyBreadcrumbList[3].name = selectedStop;
  const { setParentServicePointSloid } = useParkingLotStore();

  useEffect(() => {
    // Retrieve saved stop point and parent service point SLOID from local storage
    const savedStop = localStorage.getItem("selectedStop");
    const savedParentSloid = localStorage.getItem("parentSloid");

    if (savedStop) {
      setSelectedStop(savedStop);
    }

    if (savedParentSloid) {
      setParentServicePointSloid(savedParentSloid);
    }
  }, [setSelectedStop, setParentServicePointSloid]);

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
        {/* Hidden heading for accessibility */}
        <h1 className="sr-only">Haltestellen Details</h1>
        {/* Component displaying the stop point details */}
        <StopPoint />
      </div>
    </>
  );
}

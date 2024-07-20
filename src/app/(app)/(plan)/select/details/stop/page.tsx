"use client";

import { StopPoint } from "@/components/stop/stop-point";
import { useJourneyStore } from "@/store/useJourneyStore";
import { JourneyBreadcrumbList } from "@/components/shared/breadcrumb-list";
import React, { useEffect } from "react";
import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { useParkingLotStore } from "@/store/useParkingLotStore";

/**
 * Component for displaying stop point page.
 * @returns {React.ReactElement} The stop point page component.
 */

export default function StopPointPage(): React.ReactElement {
  const currentPage = "/select/details/stop";
  const { selectedStop, setSelectedStop } = useJourneyStore();
  JourneyBreadcrumbList[3].name = selectedStop;
  const { setParentServicePointSloid } = useParkingLotStore();

  useEffect(() => {
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
      <div className="w-full max-w-screen-lg px-0">
        <MyBreadcrumb
          currentPage={currentPage}
          breadcrumbList={JourneyBreadcrumbList}
        />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <h1 className="sr-only">Haltestellen Details</h1>
        <StopPoint />
      </div>
    </>
  );
}

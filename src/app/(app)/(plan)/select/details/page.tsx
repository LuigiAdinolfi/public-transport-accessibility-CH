"use client";

import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { JourneyDetails } from "@/components/details/journey-details";
import * as React from "react";
import { JourneyBreadcrumbList } from "@/components/shared/breadcrumb-list";
import { useJourneyStore } from "@/store/useJourneyStore";
import { useEffect } from "react";

/**
 * Component for displaying the journey details page.
 * This component includes breadcrumb navigation and the journey details section.
 *
 * @returns {React.ReactElement} The journey details page component.
 */
export default function JourneyDetailsPage(): React.ReactElement {
  const currentPage = "/select/details";
  const { setAllLegs, setAccessIcons } = useJourneyStore();

  useEffect(() => {
    // Retrieve journey data from local storage
    const storedJourneyData = localStorage.getItem("journeyData");
    if (storedJourneyData) {
      // Parse and set journey data to the store
      const { allLegs, accessIcons } = JSON.parse(storedJourneyData);
      setAllLegs(allLegs);
      setAccessIcons(accessIcons);
    }
  }, [setAllLegs, setAccessIcons]);

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
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        {/* Hidden heading for accessibility */}
        <h1 className="sr-only">Reise Details</h1>
        {/* Component displaying the journey details */}
        <JourneyDetails />
      </div>
    </>
  );
}

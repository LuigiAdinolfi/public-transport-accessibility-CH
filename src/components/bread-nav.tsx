import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/**
 * Component representing a breadcrumb for the "Home" page.
 * @returns JSX.Element
 */
export function BreadcrumbHome() {
  return (
    <Breadcrumb className="lg:w-[960px] w-full text-left px-2">
      <BreadcrumbList className="text-lg">
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">Plan Journey</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

/**
 * Component representing a breadcrumb for the "Choose Journey" page.
 * @returns JSX.Element
 */
export function BreadcrumbChooseJourney() {
  return (
    <Breadcrumb className="lg:w-[960px] w-full text-left px-2">
      <BreadcrumbList className="text-lg">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Plan Journey</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">Choose Journey</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

/**
 * Component representing a breadcrumb for the "Journey Details" page.
 * @returns JSX.Element
 */
export function BreadcrumbJourneyDetails() {
  return (
    <Breadcrumb className="lg:w-[960px] w-full text-left px-2">
      <BreadcrumbList className="text-lg">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Plan Journey</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/choose-journey">Choose Journey</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">Journey Details</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

/**
 * Component representing a breadcrumb for the "Stop Point" page.
 * @returns JSX.Element
 */
export function BreadcrumbStopPoint() {
  return (
    <Breadcrumb className="lg:w-[960px] w-full text-left px-2">
      <BreadcrumbList className="text-lg">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Plan Journey</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/choose-journey">Choose Journey</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/journey-details">
            Journey Details
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">Stop Point</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

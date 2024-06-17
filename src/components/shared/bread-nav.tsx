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
    <Breadcrumb className="w-full px-2 text-left lg:w-[960px]">
      <BreadcrumbList className="text-lg">
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">Reise planen</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

/**
 * Component representing a breadcrumb for the "Choose Journey" page.
 * @returns JSX.Element
 */
export function BreadcrumbSelectJourney() {
  return (
    <Breadcrumb className="w-full px-2 text-left lg:w-[960px]">
      <BreadcrumbList className="text-lg">
        <BreadcrumbItem className="text-zinc-600 dark:text-zinc-400">
          <BreadcrumbLink href="/">Reise planen</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">Reise auswählen</BreadcrumbPage>
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
    <Breadcrumb className="w-full px-2 text-left lg:w-[960px]">
      <BreadcrumbList className="text-lg">
        <BreadcrumbItem className="text-zinc-600 dark:text-zinc-400">
          <BreadcrumbLink href="/">Reise planen</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="text-zinc-600 dark:text-zinc-400">
          <BreadcrumbLink href="/select">
            Reise auswählen
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">Reise Details</BreadcrumbPage>
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
    <Breadcrumb className="w-full px-2 text-left lg:w-[960px]">
      <BreadcrumbList className="text-lg">
        <BreadcrumbItem className="text-zinc-600 dark:text-zinc-400">
          <BreadcrumbLink href="/">Reise planen</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="text-zinc-600 dark:text-zinc-400">
          <BreadcrumbLink href="/select">
            Reise auswählen
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="text-zinc-600 dark:text-zinc-400" href="/select/details">
            Reise Details
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">Haltestelle</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

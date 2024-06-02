import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbHome() {
  return (
    <Breadcrumb className="lg:w-[960px] w-full text-left px-2">
      <BreadcrumbList className="text-xl">
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">Reise planen</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function BreadcrumbChooseJourney() {
  return (
    <Breadcrumb className="lg:w-[960px] w-full text-left px-2">
      <BreadcrumbList className="text-xl">
        <BreadcrumbItem>
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

export function BreadcrumbJourneyDetails() {
  return (
    <Breadcrumb className="lg:w-[960px] w-full text-left px-2">
      <BreadcrumbList className="text-xl">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Reise planen</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/choose-journey">
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

export function BreadcrumbStopPoint() {
  return (
    <Breadcrumb className="lg:w-[960px] w-full text-left px-2">
      <BreadcrumbList className="text-xl">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Reise planen</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/choose-journey">
            Reise auswählen
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/journey-details">Reise Details</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">Haltestelle</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

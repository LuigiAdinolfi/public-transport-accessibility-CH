import { BreadcrumbJourneyDetails } from "@/components/shared/bread-nav";
import { JourneyDetails } from "@/components/details/journey-details";

export default function JourneyDetailsPage() {
  return (
    <>
      <div>
        <BreadcrumbJourneyDetails />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-12">
        <JourneyDetails />
      </div>
    </>
  );
}

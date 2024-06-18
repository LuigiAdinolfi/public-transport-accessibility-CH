import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { JourneyDetails } from "@/components/details/journey-details";

export default function JourneyDetailsPage() {
  const currentPage = "/select/details";
  return (
    <>
      <div>
        <MyBreadcrumb currentPage={currentPage} />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <JourneyDetails />
      </div>
    </>
  );
}

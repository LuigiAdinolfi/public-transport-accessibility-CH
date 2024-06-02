import { BreadcrumbHome } from "@/components/bread-nav";
import { CardPlanJourney } from "@/components/card-plan-journey";

export default function Homepage() {
  return (
    <>
      <div>
        <BreadcrumbHome />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-between lg:p-14 py-6 w-full">
        <CardPlanJourney />
      </div>
    </>
  );
}

import { BreadcrumbHome } from "@/components/shared/bread-nav";
import { PlanJourney } from "@/components/plan/plan-journey";
import "@smastrom/react-rating/style.css";

export default function Homepage() {
  return (
    <>
      <div>
        <BreadcrumbHome />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-12">
        <PlanJourney />
      </div>
    </>
  );
}

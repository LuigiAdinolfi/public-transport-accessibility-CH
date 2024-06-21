import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { PlanJourney } from "@/components/plan/plan-journey";
import "@smastrom/react-rating/style.css";

/**
 * Homepage component for the application.
 * Renders the main content including breadcrumb and journey planning.
 * @returns {JSX.Element} - Homepage component.
 */
export default function Homepage() {
  const currentPage = "/";
  return (
    <>
      <div>
        <MyBreadcrumb currentPage={currentPage} />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <PlanJourney />
      </div>
    </>
  );
}

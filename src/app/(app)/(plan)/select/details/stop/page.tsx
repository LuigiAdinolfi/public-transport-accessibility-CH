import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { StopPoint } from "@/components/stop/stop-point";

/**
 * StopPage component renders the stop details page with breadcrumbs.
 * @returns {JSX.Element} - StopPage component.
 */
export default function StopPage() {
  const currentPage = "/select/details/stop";

  return (
    <>
      {/* Breadcrumb navigation */}
      <div>
        <MyBreadcrumb currentPage={currentPage} />
      </div>

      {/* Main content area */}
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <StopPoint />
      </div>
    </>
  );
}

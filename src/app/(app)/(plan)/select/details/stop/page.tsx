import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { StopPoint } from "@/components/stop/stop-point";

export default function StopPage() {
  const currentPage = "/select/details/stop";
  return (
    <>
      <div>
        <MyBreadcrumb currentPage={currentPage} />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <StopPoint />
      </div>
    </>
  );
}
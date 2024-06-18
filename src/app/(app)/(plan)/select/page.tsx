import { MyBreadcrumb } from "@/components/shared/bread-nav";
import { SelectJourney } from "@/components/select/select-journey";

export default function SelectPage() {
  const currentPage = "/select";
  return (
    <>
      <div>
        <MyBreadcrumb currentPage={currentPage} />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        <SelectJourney />
      </div>
    </>
  );
}

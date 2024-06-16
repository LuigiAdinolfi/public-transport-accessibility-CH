import { BreadcrumbChooseJourney } from "@/components/shared/bread-nav";
import { SelectJourney } from "@/components/select/select-journey";

export default function SelectPage() {
  return (
    <>
      <div>
        <BreadcrumbChooseJourney />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-12">
        <SelectJourney />
      </div>
    </>
  );
}

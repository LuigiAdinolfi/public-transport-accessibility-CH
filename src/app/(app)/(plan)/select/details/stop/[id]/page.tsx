import { MyBreadcrumb } from "@/components/shared/bread-nav";

export default function StopPointPage({ params }: { params: { id: string } }) {
  const currentPage = "/select/details/stop";
  return (
    <>
      <div>
        <MyBreadcrumb currentPage={currentPage} />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-10">
        Stop Point: {params.id}
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const stopPoints = [{ id: "Basel" }, { id: "Brugg" }, { id: "Bern" }];

  return stopPoints.map((stop: { id: string }) => ({
    id: stop.id,
  }));
}

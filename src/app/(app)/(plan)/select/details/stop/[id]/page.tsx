import { BreadcrumbStopPoint } from "@/components/shared/bread-nav";

export default function StopPoint({ params }: { params: { id: string } }) {
  return (
    <>
      <div>
        <BreadcrumbStopPoint />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-6 lg:p-12">
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

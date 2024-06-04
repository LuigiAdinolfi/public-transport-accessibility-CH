import { BreadcrumbStopPoint } from "@/components/shared/bread-nav";

export default function StopPoint({ params }: { params: { id: string } }) {
  return (
    <>
      <div>
        <BreadcrumbStopPoint />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-between lg:p-12 py-6 w-full">
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

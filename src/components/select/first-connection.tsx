import { Card, CardContent } from "@/components/ui/card";

export function FirstConnection() {
  return (
    <Card className="flex basis-1/2 justify-start border-opacity-0 bg-zinc-50">
      <CardContent className="flex w-full justify-between px-3 py-2">
        <div className="flex justify-start">20:28</div>
        <div className="flex justify-end">20:55</div>
      </CardContent>
    </Card>
  );
}

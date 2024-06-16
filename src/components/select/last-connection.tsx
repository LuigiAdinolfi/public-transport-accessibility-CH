import { Card, CardContent } from "@/components/ui/card";

export function LastConnection() {
  return (
    <Card className="flex basis-1/2 justify-start border-opacity-0 bg-zinc-50">
      <CardContent className="flex w-full justify-between px-3 py-2">
        <div className="flex justify-start">21:02</div>
        <div className="flex justify-end">21:28</div>
      </CardContent>
    </Card>
  );
}

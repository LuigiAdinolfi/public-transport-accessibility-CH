import * as React from "react";
import { Card } from "@/components/ui/card";
import { Map } from "lucide-react";
import Image from "next/image";

export function DummyMap() {

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between pb-8">
        <div className="flex items-center space-x-1.5">
          <div className="text-lg font-medium pr-1">
            Kartenvisualisierung
          </div>
          <Map className="h-6 w-6" />
        </div>
      </div>
      <div
        className="flex items-center h-96 justify-between rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
        <Image src="/map.png" alt="Map" width={920} height={440} />
      </div>
    </Card>
  );
}
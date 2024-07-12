import * as React from "react";
import { Card } from "@/components/ui/card";
import { Map } from "lucide-react";
import Image from "next/image";

/**
 * DummyMap component displays a static map image in a card layout.
 *
 * @returns {React.ReactElement} The DummyMap component.
 */
export function DummyMap(): React.ReactElement {
  return (
    <Card className="mt-10 p-6">
      <div className="flex items-center justify-between pb-8">
        <div className="flex items-center space-x-1.5">
          <div className="pr-1 text-lg font-medium">Kartenvisualisierung</div>
          <Map className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
      <div
        className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 lg:h-[420px]"
        aria-hidden="true"
      >
        <Image
          src="/map.png"
          alt="Map"
          width={1024}
          height={440}
          aria-label="Static map image"
        />
      </div>
    </Card>
  );
}

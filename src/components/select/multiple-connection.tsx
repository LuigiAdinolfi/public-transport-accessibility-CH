"use client";

import * as React from "react";
import { FirstConnection } from "@/components/select/first-connection";
import { LastConnection } from "@/components/select/last-connection";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DarkWheelchairReservation, LightWheelchairReservation } from "@/assets/icons/wheelchair-reservation";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export function MultipleConnection() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  return (
    <Button
      className="flex h-full w-full justify-start"
      variant="outline"
      onClick={() => router.push("/select/details")}
      aria-label="Select journey with multiple connections"
    >
      <div className="grid w-full">
        {/* Accessibility and Travel Time */}
        <div className="mb-2 flex w-full items-center justify-start px-3 py-4 text-zinc-950 dark:text-zinc-50">
          <div className="flex w-full justify-start">
            <div className="pr-2">Niedrigste Barrierefreiheit:</div>
            {resolvedTheme === "dark" ? (
              <DarkWheelchairReservation className="h-6 w-6" />
            ) : (
              <LightWheelchairReservation className="h-6 w-6" />
            )}
            <div className="pl-2">Mit Personalhilfe ein-/aussteigen</div>
          </div>
          <div className="justify-end">1h Reisezeit</div>
        </div>

        {/* Connection Details */}
        <div className="flex flex-col sm:flex-row mb-2">
          <div className="w-full mb-2">
            <FirstConnection />
          </div>
          <div className="flex items-center justify-center px-2">
            <ChevronRight />
          </div>
          <div className="w-full mb-2">
            <LastConnection />
          </div>
        </div>
      </div>
    </Button>
  );
}

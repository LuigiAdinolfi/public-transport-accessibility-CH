"use client";

import * as React from "react";
import { FirstConnection } from "@/components/select/first-connection";
import { LastConnection } from "@/components/select/last-connection";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DarkWheelchairReservation, LightWheelchairReservation } from "@/assets/icons/wheelchair-reservation";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

/**
 * Component representing a button for selecting a journey with multiple connections.
 * @returns {JSX.Element} JSX Element
 */
export function MultipleConnection() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  /**
   * Handles click event to navigate to journey details.
   */
  const handleClick = () => {
    router.push("/select/details");
  };

  return (
    <Button
      className="flex h-full w-full justify-start"
      variant="outline"
      onClick={handleClick}
      aria-label="Select journey with multiple connections"
    >
      <div className="grid w-full">
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
        <div className="flex flex-row mb-2">
          <FirstConnection />
          <div className="flex items-center justify-center px-2">
            <ChevronRight />
          </div>
          <LastConnection />
        </div>
      </div>
    </Button>
  );
}

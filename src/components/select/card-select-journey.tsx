import { Card } from "@/components/ui/card";
import * as React from "react";
import { MultipleConnection } from "@/components/select/multiple-connection";
import { DirectConnection } from "@/components/select/direct-connection";

/**
 * Component representing a card to select journey options.
 * @returns {JSX.Element} JSX Element
 */
export function CardSelectJourney() {
  return (
    <Card className="mt-3">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex w-full justify-start text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex w-full justify-start text-zinc-600 dark:text-zinc-400">
            Wählen Sie eine dieser Optionen aus.
          </div>
          <div className="flex w-full justify-end font-normal text-zinc-950 dark:text-zinc-400">
            Fr. 10.05.2024
          </div>
        </div>
      </div>
      <div className="space-y-6 p-6 pt-0">
        <MultipleConnection />
        <DirectConnection />
      </div>
    </Card>
  );
}

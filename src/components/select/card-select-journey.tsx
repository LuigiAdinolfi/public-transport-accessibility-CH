import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import * as React from "react";
import { MultipleConnection } from "@/components/select/multiple-connection";
import { DirectConnection } from "@/components/select/direct-connection";

export function CardSelectJourney() {
  return (
    <Card className="mt-3 border-b-zinc-500">
      <CardHeader>
        <CardDescription className="flex w-full justify-start">
          <div className="flex w-full justify-start text-zinc-600 dark:text-zinc-400">
            Wählen Sie eine dieser Optionen aus.
          </div>
          <div className="flex w-full justify-end font-normal text-zinc-950 dark:text-zinc-400">
            Fr. 10.05.2024
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <MultipleConnection />
        <DirectConnection />
      </CardContent>
    </Card>
  );
}

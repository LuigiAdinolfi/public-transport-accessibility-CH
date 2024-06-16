import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import * as React from "react";
import { MultipleConnection } from "@/components/select/multiple-connection";

export function CardSelectJourney() {
  return (
    <Card className="mt-3">
      <CardHeader>
        <CardDescription className="flex w-full justify-start">
          <div className="flex w-full justify-start text-zinc-600">
            Wählen Sie eine dieser Optionen aus.
          </div>
          <div className="flex w-full justify-end font-normal text-zinc-950">
            Fr. 10.05.2024
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-12 pb-12">
        <MultipleConnection />
        {/*<DirectConnection />*/}
      </CardContent>
    </Card>
  );
}

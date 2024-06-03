import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import * as React from "react";

export function CardRecentJourneys() {
  return (
    <Card>
      <CardHeader className="pb-8">
        <CardDescription>Eine frühere Reise auswählen.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-12 pb-12"></CardContent>
    </Card>
  );
}

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

export function BackButton() {
  return (
    <Button variant="outline">
      <ArrowLeft className="mr-2 h-4 w-4" />
      Zurück
    </Button>
  );
}

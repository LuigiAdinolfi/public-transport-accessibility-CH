"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function PreviousConnections(): React.ReactElement {
  return (
    <div className="flex w-full justify-center">
      <Button
        className="flex w-full text-base font-medium"
        variant="secondary"
        aria-label="Previous Connections"
        onClick={() => console.log("Previous Connections")}
      >
        Frühere Verbindungen
      </Button>
    </div>
  );
}

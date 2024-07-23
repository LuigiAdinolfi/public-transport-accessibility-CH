"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function NextConnections(): React.ReactElement {
  return (
    <div className="flex w-full justify-center">
      <Button
        className="flex w-full text-base font-medium"
        variant="secondary"
        aria-label="Next Connections"
        onClick={() => console.log("Next Connections")}
      >
        Spätere Verbindungen
      </Button>
    </div>
  );
}

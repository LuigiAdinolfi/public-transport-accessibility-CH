"use client";

import React from "react";
import { Button } from "@/components/ui/button";

/**
 * Component for displaying a button to view next available connections.
 *
 * This component renders a button labeled "Spätere Verbindungen" which is used to navigate
 * to or display the next available connections. Currently, it logs a message to the console
 * when clicked, but this can be replaced with actual navigation or functionality as needed.
 *
 * @returns {React.ReactElement} The rendered button component for viewing next connections.
 */
export default function NextConnections(): React.ReactElement {
  return (
    <div className="flex w-full justify-center">
      <Button
        className="flex w-full text-base font-medium lg:h-11"
        variant="secondary"
        aria-label="Next Connections"
        onClick={() => console.log("Next Connections")}
      >
        Spätere Verbindungen
      </Button>
    </div>
  );
}
